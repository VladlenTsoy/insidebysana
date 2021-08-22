import React, {useEffect} from "react"
import {Form, Select} from "antd"
import {fetchTags} from "admin/store/admin/tag/fetchTags"
import {useLoadingTag, useSelectAllTags} from "admin/store/admin/tag/tagSelectors"
import {useAdminDispatch} from "admin/store"

const {Option} = Select

const TagsSelect = () => {
    const tags = useSelectAllTags()
    const loading = useLoadingTag()
    const dispatch = useAdminDispatch()

    const filterOptionHandler = (inputValue: any, option: any) => {
        if(option.label)
        return option.label.includes(inputValue)
    }

    useEffect(() => {
        const promise = dispatch(fetchTags())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <Form.Item label="Теги" name="tags_id">
            <Select
                mode="tags"
                loading={loading}
                style={{width: "100%"}}
                filterOption={filterOptionHandler}
            >
                {tags.map(tag => (
                    <Option value={String(tag.id)} key={`tag-${tag.id}`} label={tag.title}>
                        {tag.title}
                    </Option>
                ))}
            </Select>
        </Form.Item>
    )
}

export default TagsSelect
