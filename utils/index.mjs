import fs from 'fs'
import path from 'path'

export const removeCsvExtension = (filename) => 
  filename.replace(/(?=\.csv).+/, '')

export const getAllFiles = function (dirPath, fileExt, arrayOfFiles) {
  const files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function (file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, fileExt, arrayOfFiles)
    } else if (file.endsWith(fileExt)) {
      arrayOfFiles.push(path.join(dirPath, '/', file))
    }
  })

  return arrayOfFiles
}

