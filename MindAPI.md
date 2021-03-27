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
- <https://cloud.google.com/blog/products/api-management/understanding-grpc-openapi-and-rest-and-when-to-use-them>

### Check for documentation

#### Automatic

##### Swagger
- <https://github.com/danielmiessler/SecLists/blob/master/Discovery/Web-Content/swagger.txt>

##### WADL
- /application.wadl
- /application.wadl?detail=true
- /api/application.wadl

##### WSDL
- ?wsdl/?singleWsdl
  - [wsdl-wizard](https://github.com/portswigger/wsdl-wizard)
  - [SoapUI](https://www.soapui.org/)

##### GraphQL
- <https://graphql.org/learn/introspection/>
- <https://github.com/prisma-labs/get-graphql-schema>

#### Manual
- site:target.tld intitle:api | developer

### Search for APIs

#### Traffic Analysis
- [Burp CE](https://portswigger.net/burp/communitydownload)
- [ZAP](https://www.zaproxy.org/)
- [mitmproxy](https://mitmproxy.org/)

#### Wayback Machine
- <https://archive.org/web/>
- [waybackurls](https://github.com/tomnomnom/waybackurls)
- [gau](https://github.com/lc/gau)

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

##### Jaeles
- `jaeles scan -s /jaeles-signatures/sensitive/swagger-ui-probing.yaml -u TARGET.TLD`
- <https://github.com/jaeles-project/jaeles>

##### Arjun
- `arjun -u https://api.TARGET.TLD/endpoint`
- <https://github.com/s0md3v/Arjun>

##### ParamSpider
- `python3 paramspider.py --domain TARGET.TLD`
- <https://github.com/devanshbatham/ParamSpider>

##### param-miner
- <https://github.com/PortSwigger/param-miner>

##### TnT-Fuzzer
- `tntfuzzer --url https://TARGET.TLD/v2/swagger.json --iterations 100 --log_all`
- <https://github.com/Teebytes/TnT-Fuzzer>

### Supported Content Types

- Play with request URL
  - Requested resource extension e.g. replacing `.json` by `.xml`
  - Query string e.g. replacing `?json` by `?xml` or `?format=json` by `?format=xml`
- Play with `Content-Type` request header and payload
  - Without `Content-Type`, submit either `json`, `xml`, ...
  - Changing `Content-Type` and payload accordingly

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
- [Autorize](https://github.com/PortSwigger/autorize)

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
- Plain text
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
- [apicheck](https://github.com/BBVA/apicheck)

###### Test if algorithm could be changed
- [jwt.io](https://jwt.io/#debugger-io)
- [jwtcat](https://github.com/aress31/jwtcat)
- [apicheck](https://github.com/BBVA/apicheck)
- [JSON Web Token Attacker](https://portswigger.net/bappstore/82d6c60490b540369d6d5d01822bdf61)

###### Test token expiration time (TTL, RTTL)

###### Test if sensitive data is in the JWT
- [jwt.io](https://jwt.io/#debugger-io)

###### Check for Injection in "kid" element

###### Check for time constant verification for HMAC

###### Check that keys and secrets are different between ENV

##### OAuth
- Test redirect_uri for open redirects
- Test redirect_uri for XSS
- Test the existence of response_type=token
- Test CSRF

##### Basic Auth

### Excessive Data Exposure

#### Check if the API returns full data objects from database with sensitive data
- [apicheck](https://github.com/BBVA/apicheck)

#### Compare client data with the API response to check if the filtering is done by client side

#### Sniff the traffic to check for sensitive data returned by the API
- [Burp CE](https://portswigger.net/burp/communitydownload)
- [ZAP](https://www.zaproxy.org/)
- [mitmproxy](https://mitmproxy.org/)

### Lack of Resources & Rate Limiting

#### Execution timeouts
- [Regexploit](https://github.com/doyensec/regexploit)

#### Test brute-force attacks

#### Max allocable memory

#### Number of file descriptors

#### Number of processes
- [racepwn](https://github.com/racepwn/racepwn)
- [Race The Web](https://github.com/TheHackerDev/race-the-web)

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

#### Enumerate object properties

- API documentation (Reconnaissance)
- Inspect available API clients' network traffic
  - Desktop
  - Mobile
  - Web
- Exercise data retrieval endpoints
  - watch-out for `?include=user.addresses,user.cards`-like parameters
- Uncover hidden properties
    - Guessing, based on API context
    - Reverse engineering available API clients
    - Fuzzing
      - GraphQL
        - [ShapeShifter](https://github.com/szski/shapeshifter) ([demo](https://www.youtube.com/watch?v=NPDp7GHmMa0&t=2580))
  
#### Craft request payloads

- Include augmented objects
  - One additional property at a time
  - Possible combinations of properties
  - All enumerated properties at once
- Vary properties data types/values
  - Number, String, Array, Object
  - State values: `to-do` -> `in-progress` -> `done` (keep in mind possible state transitions)
- Test different operation types
  - Create
  - Update

### Security Misconfiguration

#### The latest security patches are missing, or the systems are out of date.

#### Can you use other HTTP verbs?

#### Test if Transport Layer Security (TLS) is missing
- [testssl](https://testssl.sh/)

#### Test for security headers
- [API Fuzzer](https://github.com/Fuzzapi/API-fuzzer)

#### CORS is well configured?
- [Astra](https://github.com/flipkart-incubator/Astra)
- [API Fuzzer](https://github.com/Fuzzapi/API-fuzzer)

#### Force an error to see if any sensitive information is exposed

#### GraphQL

- [Introspection Query and/or GraphiQL is enabled](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html#introspection-graphiql)
- GraphQL server provides fields name hints
- [Query batching is enabled without limit](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html#batching-attacks)
- [Unlimited Depth and/or Amount](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html#query-limiting-depth-amount)

### Injection 

#### Test if user input is validated, filtered, or sanitized by the API
- [Astra](https://github.com/flipkart-incubator/Astra)
- [API Fuzzer](https://github.com/Fuzzapi/API-fuzzer)
- [TnT-Fuzzer](https://github.com/Teebytes/TnT-Fuzzer)
- [APIFuzzer](https://github.com/KissPeter/APIFuzzer)

#### Test if client data is used or concat into DB queries, OS commands, etc
- [Astra](https://github.com/flipkart-incubator/Astra)
- [API Fuzzer](https://github.com/Fuzzapi/API-fuzzer)
- [TnT-Fuzzer](https://github.com/Teebytes/TnT-Fuzzer)
- [APIFuzzer](https://github.com/KissPeter/APIFuzzer)

#### Check if incoming data from external systems is validated, filtered, or sanitized by the API

### Improper Assets Management
- Check for the API documentation (MindAPI recon can help you here)
- Hosts inventory is missing or outdated.
- Integrated services inventory, either first- or third-party, is missing or outdated.
- Old or previous API versions are running unpatched.
