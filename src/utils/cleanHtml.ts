export default function cleanHtmlContent(htmlContent: string): string {
  const cleanedContent = htmlContent
    .replace(/<\/?[^>]+(>|$)/g, "") // Remove todas as tags HTML
    .replace(/\[edit\]/g, "") // Remove as edições como [edit]
    .replace(/&\w+;/g, "") // Remove entidades HTML (ex: &nbsp;)
    .trim();
  return cleanedContent;
}
