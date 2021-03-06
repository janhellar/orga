import { Handler } from '.'
import { Closing, FootnoteLabel, LinkPath, Opening } from '../types'

const phrasingContent: Handler = {
  name: 'inline',
  rules: [
    {
      test: 'opening',
      action: (token: Opening, { enter, consume }) => {
        enter({
          type: token.element,
          children: [],
        })
        consume()
      },
    },
    {
      test: 'closing',
      action: (token: Closing, { exit, consume }) => {
        consume()
        exit(token.element)
      },
    },
    {
      test: 'link.path',
      action: (token: LinkPath, context) => {
        const { getParent, consume, attributes } = context
        const parent = getParent()

        parent.path = {
          protocol: token.protocol,
          value: token.value,
          search: token.search,
        }
        parent.attributes = attributes
        context.attributes = {}
        consume()
      },
    },
    {
      test: 'footnote.label',
      action: (token: FootnoteLabel, { getParent, consume }) => {
        const parent = getParent()

        parent.label = token.label
        consume()
      },
    },
    {
      test: 'text',
      action: (_, { consume }) => {
        consume()
      },
    },
  ],
}

export default phrasingContent
