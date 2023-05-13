import DB from '@/utils/indexedDB'
import languageObjectStore from './objectStore/language'
import userObjectStore from './objectStore/user'
import orderObjectStore from './objectStore/order'
import recordObjectStore from './objectStore/record'

export const airbnbDB = new DB('airbnb')
export default {
    airbnbDB,
    languageObjectStore,
    userObjectStore,
    orderObjectStore,
    recordObjectStore
}