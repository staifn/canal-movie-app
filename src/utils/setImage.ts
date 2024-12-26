import { IMAGE_BASE_URL } from "@/config/config";

export const setImage = (path: string): string => path ? IMAGE_BASE_URL + path : '/images/canal-logo.png'
