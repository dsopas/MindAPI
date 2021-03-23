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

## Testing

### Broken Object Level Authorization

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

### Broken Authentication

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
- <https://medium.com/swlh/hacking-json-web-tokens-jwts-9122efe91e4a>

##### OAuth
- Test redirect_uri for open redirects
- Test the existence of response_type=token
- Test CSRF

##### Basic Auth

### Excessive Data Exposure
- Check if the API returns full data objects from database with sensitive data
- Compare client data with the API response to check if the filtering is done by client side
- Sniff the traffic to check for sensitive data returned by the API

### Lack of Resources & Rate Limiting

#### Execution timeouts

#### Test brute-force attacks

#### Max allocable memory

#### Number of file descriptors

#### Number of processes

#### Request payload size (e.g. uploads)

#### Number of requests per client/resource
- [Astra](https://github.com/flipkart-incubator/Astra)
- [API Fuzzer](https://github.com/Fuzzapi/API-fuzzer)

#### Number of records per page to return in a single request response
- [API Fuzzer](https://github.com/Fuzzapi/API-fuzzer)

### Broken Function Level Authorization
- Can a regular user access administrative endpoints? (MindAPI recon can help you here)
- Testing different HTTP methods (GET, POST, PUT, DELETE, PATCH) will allow level escalation?
- Enumerate/Bruteforce endpoints for getting unauthorized requests (MindAPI recon can help you here)

### Mass Assignment
- An API endpoint is vulnerable if it automatically converts client parameters into internal object properties, without considering the sensitivity and the exposure level of these properties. This could allow an attacker to update object properties that they should not have access to.
- Sensitive properties
- Permission-related properties: user.is_admin, user.is_vip should only be set by admins.
- Process-dependent properties: user.cash should only be set internally after payment verification.
- Internal properties: article.created_time should only be set internally by the application.

### Security Misconfiguration

#### The latest security patches are missing, or the systems are out of date.

#### Can you use other HTTP verbs?

#### Test if Transport Layer Security (TLS) is missing

#### Test for security headers
- [API Fuzzer](https://github.com/Fuzzapi/API-fuzzer)

#### CORS is well configured?
- [Astra](https://github.com/flipkart-incubator/Astra)
- [API Fuzzer](https://github.com/Fuzzapi/API-fuzzer)

#### Force an error to see if any sensitive information is exposed

### Injection 

#### Test if user input is validated, filtered, or sanitized by the API
- [Astra](https://github.com/flipkart-incubator/Astra)
- [API Fuzzer](https://github.com/Fuzzapi/API-fuzzer)

#### Test if client data is used or concat into DB queres, OS commands, etc
- [Astra](https://github.com/flipkart-incubator/Astra)
- [API Fuzzer](https://github.com/Fuzzapi/API-fuzzer)

#### Check if incoming data from external systems is validated, filtered, or sanitized by the API

### Improper Assets Management
- Check for the API documention (MindAPI recon can help you here)
- Hosts inventory is missing or outdated.
- Integrated services inventory, either first- or third-party, is missing or outdated.
- Old or previous API versions are running unpatched.