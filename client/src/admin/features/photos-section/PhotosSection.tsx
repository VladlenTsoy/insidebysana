import React, {Dispatch, SetStateAction, useCallback, useEffect, useRef} from "react"
import {Divider, Typography} from "antd"
import {Element} from "react-scroll"
import styles from "./PhotosSection.module.less"
import {
    DragDropContext,
    Droppable,
    Draggable,
    SensorAPI,
    SnapDragActions,
    DropResult
} from "react-beautiful-dnd"
import PhotoBlock from "./PhotoBlock"
import AddPhotoBlock from "./AddPhotoBlock"
import {getBase64} from "utils/getBase64"
import {useDeletePhotoMutation, useUploadPhotoMutation} from "./photoApi"
import {TemporaryImageType} from "../../types/Product"

const {Title} = Typography

interface PhotosSectionProps {
    imageUrls: TemporaryImageType[]
    setImageUrl: Dispatch<SetStateAction<TemporaryImageType[]>>
}

const PhotosSection: React.FC<PhotosSectionProps> = ({imageUrls, setImageUrl}) => {
    const sensorAPIRef = useRef<SensorAPI | null>(null)
    const actionsRef = useRef<SnapDragActions>()
    // Загрузить фотографию
    const [uploadPhoto, {data}] = useUploadPhotoMutation()
    // Удаление фотографии
    const [deletePhoto] = useDeletePhotoMutation()

    //
    const lift = (quoteId: string): any => {
        const api = sensorAPIRef.current
        if (!api) return null
        const preDrag = api.tryGetLock(quoteId, () => {
        })

        if (!preDrag) return null
        return preDrag.snapLift()
    }

    // Проверить текущию позицию на существования
    const maybe = (position: string, fn: (callbacks: SnapDragActions) => void) => {
        actionsRef.current = lift(String(position))
        if (actionsRef.current) {
            fn(actionsRef.current)
            setTimeout(() => actionsRef.current && actionsRef.current.drop(), 300)
        }
    }

    // Перезаписать массив с изменненными занчениями
    const reorder = (list: any[], startIndex: number, endIndex: number) => {
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)
        return result
    }

    // Передвинуть блок фотографии
    const onDragEnd = (result: DropResult) => {
        const {destination, source} = result
        // Проверка на следующую колонну если не выбранна
        if (!destination) return
        // Проверка на следующую колонну если та же
        if (destination.index === source.index) return
        setImageUrl(prevState => reorder(prevState, source.index, destination.index))
    }

    // Сдвинуть фотографию влево
    const nextHandler = (index: string) => {
        maybe(index, (callbacks: SnapDragActions) => {
            callbacks.moveRight()
        })
    }

    // Сдвинуть фотографию вправо
    const prevHandler = (index: string) => {
        maybe(index, (callbacks: SnapDragActions) => {
            callbacks.moveLeft()
        })
    }

    // Добавление фотографии
    const addPhotoHandler = useCallback(
        (e: any) => {
            if (e.target.files.length) {
                return getBase64(e.target.files[0], (imageUrl: any) => {
                    // Временное Id
                    const timeId = new Date().getTime()
                    // Добавление данных о фотографии
                    setImageUrl(prevState => [...prevState, {imageUrl, id: timeId, loading: true}])
                    // Загрузка фотографии
                    uploadPhoto({image: imageUrl, time: timeId})
                })
            }
        },
        [uploadPhoto, setImageUrl]
    )

    // Удаление данных фотографии
    const removeTemporaryPhotoHandler = useCallback(
        async (id: number) => {
            setImageUrl(prevState =>
                prevState.map(image => (image.id === id ? {...image, loading: true} : image))
            )
            const findImage = imageUrls.find(image => image.id === id)
            if (findImage && findImage.imagePath)
                await deletePhoto(
                    findImage.isSaved
                        ? {pathToImage: findImage.imagePath, id: id}
                        : {pathToImage: findImage.imagePath}
                )
            setImageUrl(prevState => prevState.filter(image => image.id !== id))
        },
        [deletePhoto, setImageUrl, imageUrls]
    )

    useEffect(() => {
        if (data) {
            setImageUrl(prevState =>
                prevState.map(img => {
                    if (img.id === data.time) return data
                    return img
                })
            )
        }
    }, [data, setImageUrl])

    return (
        <Element name="photos" className="photos">
            <Divider />
            <Title level={3}>Фотографии</Title>
            <div className={styles.dragDropPhotos}>
                <DragDropContext onDragEnd={onDragEnd} sensors={[api => (sensorAPIRef.current = api)]}>
                    <Droppable droppableId="list" direction="horizontal">
                        {provided => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={styles.droppablePhotos}
                            >
                                {imageUrls.map((image, key) => (
                                    <Draggable draggableId={`${image.id}`} key={image.id} index={key}>
                                        {dragProvided => (
                                            <PhotoBlock
                                                dragProvided={dragProvided}
                                                index={key}
                                                image={image}
                                                nextHandler={nextHandler}
                                                prevHandler={prevHandler}
                                                deletePhoto={removeTemporaryPhotoHandler}
                                            />
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                <AddPhotoBlock addPhoto={addPhotoHandler} />
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </Element>
    )
}
export default PhotosSection
