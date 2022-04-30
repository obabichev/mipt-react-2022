import axios from "axios"
import { tagsPath } from "../apiPaths"

export const getAll = async () => {
    const response = await axios.get(tagsPath)

    return response
}