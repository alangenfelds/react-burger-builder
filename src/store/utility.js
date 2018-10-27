export const updateObject = (oldObject, updatedProperies) => {
    return {
        ...oldObject,
        ...updatedProperies
    }
}