# MindAPI

## Reconnaissance

### Identify architecture

#### Architecture
- REST API
- GraphQL
- SOAP
- XML-RPC
- JSON-RPC

#### Documentation
- <https://smartbear.com/blog/soap-vs-rest-whats-the-difference/>
- <https://www.howtographql.com/basics/1-graphql-is-the-better-rest/>
- <https://www.smashingmagazine.com/2016/09/understanding-rest-and-rpc-for-http-apis/>
- <https://www.soapui.org/docs/rest-testing/working-with-rest-services/>

### Check for documentation

#### Automatic

##### Swagger
- <https://github.com/danielmiessler/SecLists/blob/master/Discovery/Web-Content/swagger.txt>

##### WADL
- /application.wadl
- /application.wadl?detail=true
- /api/application.wadl

##### WSDL
- ?wsdl

##### GraphQL
- <https://graphql.org/learn/introspection/>
- <https://github.com/prisma-labs/get-graphql-schema>

#### Manual
- site:target.tld intitle:api | developer

### Search for APIs

#### Traffic Analysis

#### Wayback Machine
- <https://archive.org/web/>

#### Path Manipulation
- /api/v1
- /api/v2
- /api/v3

#### Dorks

##### Google
- site:target.tld inurl:api
- intitle:"index of" "api.yaml" site:target.tld
- intitle:"index of" intext:"apikey.txt" site:target.tld
- allintext:"API_SECRET*" ext:env | ext:yml site:target.tld

##### Github
- <https://github.com/search?q=target.tld+%2Bapi>

#### API Directories

- <https://apis.guru/browse-apis/>
- <https://apilist.fun/>
- <https://apiharmony-open.mybluemix.net/public>

### Enumerate endpoints / methods

#### Endpoints

##### GraphQL
- <https://github.com/danielmiessler/SecLists/blob/master/Discovery/Web-Content/graphql.txt>

##### Swagger
- <https://github.com/danielmiessler/SecLists/blob/master/Discovery/Web-Content/swagger.txt>

##### Other
- <https://github.com/danielmiessler/SecLists/blob/master/Discovery/Web-Content/api/api_endpoints.txt>
- <https://s3.amazonaws.com/assetnote-wordlists/data/automated/httparchive_apiroutes_2020_11_20.txt>

##### WADL
- <https://github.com/dwisiswant0/wadl-dumper>

#### Tools

##### ffuf
- `ffuf -w wordlists/WORDLIST -u https://TARGET.TLD/FUZZ`
- <https://github.com/ffuf/ffuf>

##### Amass
- `amass enum -active -d TARGET.TLD -config /root/amass/config.ini`
- <https://github.com/OWASP/Amass>

##### nuclei
- `nuclei -target TARGET.TLD -t exposures/apis/`
- <https://github.com/projectdiscovery/nuclei>

## OWASP API Security Top10

### API1 - Broken Object Level Authorization

#### Endpoint receives an ID?

##### Understand the pattern
- Sequential
- Encoded
- Other

##### Tamper

###### Change
- Next value
- Previous value
- Data Type
- Method -> GET to POST

###### Duplicate
- ?id=1&id=2

###### Add as an array
- ?id[]=1&id[]=2

#### Check the response

#### Tools
- [Astra](https://github.com/flipkart-incubator/Astra)
- [apidor](https://github.com/bncrypted/apidor)
- [InQL](https://github.com/doyensec/inql)
- [AuthMatrix](https://github.com/SecurityInnovation/AuthMatrix)

#### Documentation
- <https://github.com/OWASP/API-Security/blob/master/2019/en/src/0xa1-broken-object-level-authorization.md>
- <https://www.bugcrowd.com/blog/how-to-find-idor-insecure-direct-object-reference-vulnerabilities-for-large-bounty-rewards/>

### API2 - Broken Authentication

#### Test

##### URL sensitive data
- Passwords
- Tokens

##### Brute force attacks
- Login
- Forget Password
- Forget Username

##### Authenticity of tokens

##### Password

###### Strength
- Changing Password
- Registration

###### Type
- Plaintext
- Weak encryption
- Weak hash algorithm

###### API Keys
- Predictable
- Weak hash algorithm

#### Types of Authentication

##### JWT

###### Test JWT secret brute-forcing
- [jwt_tool](https://github.com/ticarpi/jwt_tool)
- [jwt_cracker](https://github.com/lmammino/jwt-cracker)
- [jwtcat](https://github.com/aress31/jwtcat)

###### Test if algorithm could be changed
- [jwt.io](https://jwt.io/#debugger-io)
- [jwtcat](https://github.com/aress31/jwtcat)

###### Test token expiration time (TTL, RTTL)

###### Test if sensitive data is in the JWT
- [jwt.io](https://jwt.io/#debugger-io)

###### Check for Injection in "kid" element

###### Check for time constant verification for HMAC

###### Check that keys and secrets are different between ENV

###### Documentation
- [https://medium.com/swlh/hacking-json-web-tokens-jwts-9122efe91e4a]

##### OAuth
- Test redirect_uri for open redirects
- Test the existence of response_type=token
- Test CSRF

##### Basic Auth