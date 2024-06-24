import { app } from 'electron'
import { join } from 'path'
import fs from 'fs'

interface AppData {
  [appName: string]: {
    [key: string]: string
  }
}

// Default data structure
const defaultData: AppData = {}

// Helper function to read data
const readData = (): AppData => {
  const dataFilePath = join(app.getPath('userData'), 'data.json')
  try {
    if (!fs.existsSync(dataFilePath)) {
      // File does not exist, create it with default data
      fs.writeFileSync(dataFilePath, JSON.stringify(defaultData, null, 2))
      return defaultData
    }

    const rawData = fs.readFileSync(dataFilePath)
    return JSON.parse(rawData.toString())
  } catch (err) {
    console.error('Error reading data:', err)
    return defaultData
  }
}

// Helper function to write data
const writeData = (data): void => {
  try {
    const dataFilePath = join(app.getPath('userData'), 'data.json')
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))
  } catch (err) {
    console.error('Error writing data:', err)
  }
}

// Set data function
const setData = (key: string, value: { [key: string]: string }): void => {
  const data = readData()
  data[key] = value
  writeData(data)
}
// Set data function
const addData = (key: string, value: { [key: string]: string }): void => {
  const data = readData()
  if (!data[key]) {
    data[key] = value
  } else {
    data[key] = { ...data[key], ...value }
  }
  writeData(data)
}

// Get data function
const getData = (key): { [key: string]: string } => {
  const data = readData()
  return data[key]
}

export { setData, getData, addData }
