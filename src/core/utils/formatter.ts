export const formatStrapiResponse = (object: any) => {

    object = object.data || object

    if (Array.isArray(object)) {

        for (let i = 0; i < object.length; i++) {
            object[i] = formatStrapiResponse(object[i])
        }
        return object

    } else {

        for (const attribute of Object.keys(object.attributes)) {

            if (object.attributes[attribute]?.data) 
                object.attributes[attribute] = formatStrapiResponse(object.attributes[attribute])
            else if (object.attributes[attribute]?.data === null)
                object.attributes[attribute] = null
        }

        object.attributes.id = object.id
        return object.attributes
    }
}