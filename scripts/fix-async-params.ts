import fs from 'fs'
import path from 'path'

const filesToFix = [
  'src/app/[lang]/(dashboard)/(private)/dashboards/domus/page.tsx',
  'src/app/[lang]/(dashboard)/(private)/documents/page.tsx',
  'src/app/[lang]/(dashboard)/(private)/financials/page.tsx',
  'src/app/[lang]/(dashboard)/(private)/projects/page.tsx',
  'src/app/[lang]/(dashboard)/(private)/projects/[id]/page.tsx',
  'src/app/[lang]/(dashboard)/(private)/tasks/page.tsx'
]

for (const file of filesToFix) {
  const filePath = path.join(process.cwd(), file)
  if (!fs.existsSync(filePath)) continue
  
  let content = fs.readFileSync(filePath, 'utf-8')
  
  // Fix function signature
  content = content.replace(
    /export default async function \w+\({ params }\s*:\s*{\s*params:\s*{\s*lang:\s*string(?:;\s*id:\s*string)?\s*}\s*}\)/g,
    (match) => {
      if (match.includes('id:')) {
        return match.replace('{ params: { lang: string; id: string } }', '{ params: Promise<{ lang: string; id: string }> }')
      } else {
        return match.replace('{ params: { lang: string } }', '{ params: Promise<{ lang: string }> }')
      }
    }
  )
  
  // Add await params at the beginning of the function
  if (!content.includes('await params')) {
    content = content.replace(
      /(export default async function \w+\([^)]+\)\s*{)/g,
      (match) => {
        if (content.includes('params.id')) {
          return match + '\n  const { lang, id } = await params'
        } else {
          return match + '\n  const { lang } = await params'
        }
      }
    )
    
    // Replace params.lang with lang
    content = content.replace(/params\.lang/g, 'lang')
    
    // Replace params.id with id
    if (content.includes('await params') && content.includes('id }')) {
      content = content.replace(/params\.id/g, 'id')
    }
  }
  
  fs.writeFileSync(filePath, content)
  console.log(`Fixed: ${file}`)
}

console.log('Done!')