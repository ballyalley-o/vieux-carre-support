import { GLOBAL } from 'vcs'
import { FormatTextType } from "./utility.types"

/**
 * Formats a given text based on the specified type.
 *
 * @param {string} text - The text to be formatted.
 * @param {FormatTextType} type - The type of formatting to apply.
 *                        Accepted values are:
 *                        - 'capitalize': Capitalizes the first letter and converts the rest to lowercase.
 *                        - 'uppercase': Converts the entire text to uppercase.
 *                        - 'lowercase': Converts the entire text to lowercase.
 *                        - Any other value will return the text unchanged.
 * @returns {string} - The formatted text.
 */
export function formatText(text: string, type: FormatTextType) {
  switch (type) {
    case 'capitalize':
      return text
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    case 'uppercase':
      return text.toUpperCase()
    case 'lowercase':
      return text.toLowerCase()
    default:
      return text
  }
}

export function formatToPlainObject<T>(data: T) {
  return JSON.parse(JSON.stringify(data))
}

export function formatTicketId(ticketId: number) {
  const { PREFIX, PAD_ID } = GLOBAL.TICKET
  return `${PREFIX}-${ticketId.toString().padStart(PAD_ID, '0')}`
}

export function unformatTicketId(formattedId: string) {
  const { PREFIX } = GLOBAL.TICKET
  return parseInt(formattedId.replace(`${PREFIX}-`, ''), 10)
}