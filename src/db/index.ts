import DB from '@/utils/indexedDB'
import languageObjectStore from './objectStore/language'
import userObjectStore from './objectStore/user'

export const airbnbDB = new DB('airbnb')
export default {
    airbnbDB,
    languageObjectStore,
    userObjectStore
}