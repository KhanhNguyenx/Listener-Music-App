import unidecode from "unidecode"
export const convertToSlug = (text: string): string => {
  const unidecodeText = unidecode(text.trim())
  
  const slug = unidecodeText.replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu -
    .toLowerCase() // Chuyển đổi thành chữ thường
    
  return slug
}