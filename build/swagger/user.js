"use strict";
/**
 * @openapi
 * components:
 *  schemas:
 *    User:
 *      tags:
 *       - "User"
 *      type: object
 *      require:
 *        -AccountName
 *        -IdAccount
 *        -IdCustomer
 *        -Birthdate
 *        -FirstName
 *        -Gender
 *        -Identification
 *        -LastName
 *        -Nationality
 *        -NickName
 *        -Phone
 *        -TAC
 *        -UserName
 *      properties:
 *        AccountName:
 *          type: string
 *          description: user account
 *        IdAccount:
 *          type: string
 *          description: user id account
 *        IdCustomer:
 *          type: string
 *          description: user id customer
 *        Birthdate:
 *          type: string
 *          description: user Birthday
 *        FirstName:
 *          type: string
 *          description: user first name
 *        Gender:
 *          type: string
 *          description: user Gender
 *        Identification:
 *          type: string
 *          description: user Identification
 *        LastName:
 *          type: string
 *          description: user LastName
 *        Nationality:
 *          type: string
 *          description: user Nationality
 *        NickName:
 *          type: string
 *          description: user NickName
 *        Phone:
 *          type: string
 *          description: user Phone
 *        TAC:
 *          type: string
 *          description: user TAC
 *        UserName:
 *          type: string
 *          description: user UserName
 *    UserUpdate:
 *      tags:
 *       - "User"
 *      type: object
 *      require:
 *        -Birthdate
 *        -FirstName
 *        -Gender
 *        -Identification
 *        -LastName
 *        -Nationality
 *        -NickName
 *        -Phone
 *        -currency
 *        -NIT
 *        -webSite
 *        -Facebook
 *        -country
 *      properties:
 *        Birthdate:
 *          type: string
 *          description: user Birthday
 *        FirstName:
 *          type: string
 *          description: user first name
 *        Gender:
 *          type: string
 *          description: user Gender
 *        Identification:
 *          type: string
 *          description: user Identification
 *        LastName:
 *          type: string
 *          description: user LastName
 *        Nationality:
 *          type: string
 *          description: user Nationality
 *        NickName:
 *          type: string
 *          description: user NickName
 *        Phone:
 *          type: string
 *          description: user Phone
 *        country:
 *          type: string
 *          description: user country number
 *        Facebook:
 *          type: string
 *          description: user facebook
 *        webSite:
 *          type: string
 *          description: user webSite
 *        NIT:
 *          type: string
 *          description: user webSite
 *    userImages:
 *      type: object
 *      require:
 *        -user
 *        -images
 *      properties:
 *        user:
 *          $ref: '#/components/schemas/UserUpdate'
 *          description: User information
 *        images:
 *          $ref: '#/components/schemas/ImageFile'
 *          description: Image of user
 */
//# sourceMappingURL=user.js.map