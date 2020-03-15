import { encrypt } from './index'

describe('utils', () => {

    describe('encrypt', () => {
        it('should encrypt a message', () => {
            expect(encrypt('hello', 5)).toEqual('mjqqt')
        })
        it('should handle UPPERCASE messages', () => {
            expect(encrypt('HELLO', 5)).toEqual('MJQQT')
        })
        it('should handle mixedCase messages', () => {
            expect(encrypt('Hello', 5)).toEqual('Mjqqt')
        })
        it('shold decrypt a message', () => {
            expect(encrypt('mjqqt', 5)).toEqual('hello')
        })
        it('should decrypt a mixedCase message', () => {
            expect(encrypt('Mjqqt', 5)).toEqual('Hello')
        })
    })
})
