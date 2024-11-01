import { expect, it } from 'vitest'
import { batchHexToRgba, hexToRgba, RGB2Hex } from './color'

it('is', () => {
    expect(hexToRgba('#ffffff')).toEqual(
        {
            blue: 255,
            green: 255,
            red: 255,
            rgb: '255,255,255',
            rgba: 'rgba(255,255,255,1)',
        },
    )

    expect(RGB2Hex('rgb(255,255,255)')).toEqual('#ffffff')
    expect(RGB2Hex('rgb(255, 255, 255)')).toEqual('#ffffff')

    expect(batchHexToRgba(['#ffffff', '#000000'])).toEqual([
        '255,255,255',
        '0,0,0',
    ])
})
