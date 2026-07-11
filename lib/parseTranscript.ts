import mammoth from 'mammoth'

/**
 * Utility function to parse uploaded transcript files (.txt and .docx) to string.
 */
export async function parseFileToText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.name.endsWith('.docx')) {
      const reader = new FileReader()
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer
          if (!arrayBuffer) {
            throw new Error('Could not read array buffer')
          }
          const result = await mammoth.extractRawText({ arrayBuffer })
          resolve(result.value || '')
        } catch (err: any) {
          reject(new Error(`Failed to parse DOCX file: ${err.message}`))
        }
      }
      reader.onerror = () => {
        reject(new Error('Failed to read DOCX file.'))
      }
      reader.readAsArrayBuffer(file)
    } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        resolve(e.target?.result as string || '')
      }
      reader.onerror = () => {
        reject(new Error('Failed to read TXT file.'))
      }
      reader.readAsText(file)
    } else {
      reject(new Error('Unsupported file format. Please upload a .txt or .docx file.'))
    }
  })
}
