import { getTypeName } from './base'

/**
 * 深度比较两个值是否相等。
 * @param value1 第一个要比较的值，可以是任意类型。
 * @param value2 第二个要比较的值，可以是任意类型。
 * @returns {boolean} 如果两个值深度相等则返回 true，否则返回 false。
 */
export function isDeepEqual(value1: any, value2: any): boolean {
    // 获取两个值的类型名称进行比较
    const type1 = getTypeName(value1)
    const type2 = getTypeName(value2)
    // 如果类型不相等，则直接返回 false
    if (type1 !== type2) {
        return false
    }

    // 如果类型为数组，比较数组长度和每个元素
    if (type1 === 'array') {
        // 如果长度不相等，直接返回 false
        if (value1.length !== value2.length) {
            return false
        }

        // 遍历每个元素，使用递归比较
        return value1.every((item: any, i: number) => {
            return isDeepEqual(item, value2[i])
        })
    }
    // 如果类型为对象，比较对象的键数和每个键的值
    if (type1 === 'object') {
        // 获取对象的键并比较键数
        const keyArr = Object.keys(value1)
        if (keyArr.length !== Object.keys(value2).length) {
            return false
        }

        // 遍历每个键，使用递归比较键的值
        return keyArr.every((key: string) => {
            return isDeepEqual(value1[key], value2[key])
        })
    }
    // 对于非对象和非数组类型，使用 Object.is 进行比较
    return Object.is(value1, value2)
}
