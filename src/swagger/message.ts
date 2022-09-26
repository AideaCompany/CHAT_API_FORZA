/**
 * @openapi
 * components:
 *  schemas:
 *    PlainText:
 *      type: object
 *      require:
 *        -to
 *        -mssg
 *      properties:
 *        to:
 *          type: string
 *          description: Phone number
 *        mssg:
 *          type: string
 *          description: Message to be sended
 *      example:
 *          to: "50412345678"
 *          mssg: "Hello world!"
 *    ResponseMessage:
 *      tags:
 *       - "Messages"
 *      type: object
 *      require:
 *        -ok
 *        -resp
 *      properties:
 *        ok:
 *          type: boolean
 *          description: Response success
 *        resp:
 *          $ref: '#/components/schemas/RespData'
 *          description: Message response
 *    Template:
 *      type: object
 *      require:
 *        -to
 *        -template
 *        -lang
 *        -components
 *      properties:
 *        to:
 *          type: string
 *          description: Phone number
 *        template:
 *          type: string
 *          description: Template name
 *        lang:
 *          type: string
 *          description: Lang code for template
 *        components:
 *          type: array
 *          description: Components check
 *      example:
 *          to: "50412345678"
 *          template: "hello_world"
 *          lang: "en_US"
 *          components: []
 *    RespData:
 *      type: object
 *      require:
 *        -messaging_product
 *        -contacts
 *        -messages
 *      properties:
 *        messaging_product:
 *          type: string
 *          description: Product used
 *        contacts:
 *          type: array
 *          description: Array of contacts info
 *          items:
 *              type: object
 *              properties:
 *                  input:
 *                      type: string
 *                      description: Phone
 *                  wa_id:
 *                      type: string
 *                      description: Phone                 
 *        messages:
 *          type: array
 *          description: Array of message id
 *          items:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                      description: Message id
 */
