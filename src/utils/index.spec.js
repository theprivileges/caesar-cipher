import { encrypt } from './index'

describe('utils', () => {
    const shift = 5
    const unshift = (26 - shift) % 26 // decrypt works in reverse
    describe('encrypt', () => {
        it('should encrypt a message', () => {
            expect(encrypt('hello', shift)).toEqual('mjqqt')
        })
        it('should handle UPPERCASE messages', () => {
            expect(encrypt('HELLO', shift)).toEqual('MJQQT')
        })
        it('should handle mixedCase messages', () => {
            expect(encrypt('Hello', shift)).toEqual('Mjqqt')
        })
        it('shold decrypt a message', () => {
            expect(encrypt('mjqqt', unshift)).toEqual('hello')
        })
        it('should decrypt a mixedCase message', () => {
            expect(encrypt('Mjqqt', unshift)).toEqual('Hello')
        })
    })
})
