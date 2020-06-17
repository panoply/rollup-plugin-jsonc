import { createFilter, dataToEsm } from '@rollup/pluginutils'
import stripJsonComments from 'strip-json-comments'

/**
 * This was lifted from @rollup/plugin-json with the exception
 * of strip-json-comments and a minor addition to the options.
 *
 * @see https://github.com/rollup/plugins/blob/master/packages/json/
 * @export
 * @param {object} [options={}]
 * @returns
 */
export default function jsonc(options = {}) {

  const filter = createFilter(options.include, options.exclude)
  const indent = 'indent' in options ? options.indent : '\t'
  const jsonc = 'jsonc' in options ? options.jsonc : true

  return {
    name: 'rollup-plugin-jsonc',
    transform(json, id) {

      if (!['jsonc', '.json'].includes(id.slice(-5)) || !filter(id)) return null

      try {

        const strip = jsonc ? stripJsonComments(json, { whitespace: false }) : json

        return {
          code: dataToEsm(JSON.parse(strip), {
            preferConst: options.preferConst,
            compact: options.compact,
            namedExports: options.namedExports,
            indent
          }),
          map: { mappings: '' }
        };

      } catch (err) {

        const message = 'Could not parse JSON file';
        const position = parseInt(/[\d]/.exec(err.message)[0], 10);

        this.warn({ message, id, position });

        return null;
      }

    }
  }
}
