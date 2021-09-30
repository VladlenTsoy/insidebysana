import React, {useCallback, useEffect, useRef, useState} from "react"
import {Divider, Typography} from "antd"
import {Element} from "react-scroll"
import "./PhotosSection.less"
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
import {useUploadPhotoMutation} from "./photoApi"

const {Title} = Typography

const PhotosSection: React.FC = () => {
    const sensorAPIRef = useRef<SensorAPI | null>(null)
    const [imageUrls, setImageUrl] = useState<any[]>([])

    function lift(quoteId: string): any {
        const api = sensorAPIRef.current
        if (!api) return null
        const preDrag = api.tryGetLock(quoteId, () => {})

        if (!preDrag) return null
        return preDrag.snapLift()
    }

    const actionsRef = useRef<SnapDragActions>()

    const maybe = (position: string, fn: (callbacks: SnapDragActions) => void) => {
        actionsRef.current = lift(String(position))
        if (actionsRef.current) {
            fn(actionsRef.current)
            setTimeout(() => actionsRef.current && actionsRef.current.drop(), 300)
        }
    }

    const reorder = (list: any[], startIndex: number, endIndex: number) => {
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)
        return result
    }

    function onDragEnd(result: DropResult) {
        const {destination, source} = result
        // Проверка на следующую колонну если не выбранна
        if (!destination) return
        // Проверка на следующую колонну если та же
        if (destination.index === source.index) return
        setImageUrl(prevState => reorder(prevState, source.index, destination.index))
    }

    const nextHandler = (index: string) => {
        maybe(index, (callbacks: SnapDragActions) => {
            callbacks.moveRight()
        })
    }

    const prevHandler = (index: string) => {
        maybe(index, (callbacks: SnapDragActions) => {
            callbacks.moveLeft()
        })
    }

    const [uploadPhoto, {data}] = useUploadPhotoMutation()

    useEffect(() => {
        if (data) {
            setImageUrl(prevState =>
                prevState.map(img => {
                    if (img.id === data.time) return data
                    return img
                })
            )
        }
    }, [data])

    const addPhoto = useCallback(
        (e: any) => {
            if (e.target.files.length) {
                // Get this url from response in real world.
                return getBase64(e.target.files[0], (imageUrl: any) => {
                    const timeId = new Date().getTime()
                    setImageUrl(prevState => [...prevState, {imageUrl, id: timeId, loading: true}])
                    uploadPhoto({image: imageUrl, time: timeId})
                    // form.setFieldsValue({url_image: imageUrl})
                })
            }
        },
        [uploadPhoto]
    )

    const deletePhoto = useCallback((index: any) => {
        setImageUrl(prevState => prevState.filter(image => image.id !== index))
    }, [])

    return (
        <Element name="photos" className="photos">
            <Divider />
            <Title level={3}>Фотографии</Title>
            <div className="drag-drop-photos">
                <DragDropContext onDragEnd={onDragEnd} sensors={[api => (sensorAPIRef.current = api)]}>
                    <Droppable droppableId="list" direction="horizontal">
                        {provided => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="droppable-photos"
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
                                                deletePhoto={deletePhoto}
                                            />
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                <AddPhotoBlock addPhoto={addPhoto} />
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </Element>
    )
}
export default PhotosSection
