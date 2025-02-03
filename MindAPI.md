# MindAPI

## Reconnaissance

### Identify architecture

#### Architecture
- REST APIs
  - RESTful
    - URL structure
      - Often use resource-oriented URLs such as: `/api/v1/product/1234` 
    - Response structure 
      - Often in JSON or XML format
      - Consistent and hierarchical structure
  - OData
    - A metadata document is usually provided at `/odata/$metadata`
    - Specific query options present on the URL: `/odata/Products?$filter=Price&$orderby=desc`
    - Response often includes annotations `@odata.context` or `@odata.metadata`
    - Typically format is JSON
    - Usually the response `Content-Type` includes the string `odata`: `application/json;odata.metadata=full`
    - 
- GraphQL
  - Response structure
    - If there an issue with the query, an `errors` object is included in the response
    - Errors like `Cannot query field` or `Field <field_name> not found` is usually indicative of a GraphQL API 
    - If the response is successful the response will often contain a `data` field which includes the actual query results
  - Specific fields
    -  Response may include `__typename` which is used to identify the type of an object
- SOAP
  - Transfered data in XML format  
- XML-RPC
  - Transfered data in simpler XML format `<users><user><firstName>David</firstName>` 
- JSON-RPC
  - Transfered data similar to XML-RPC but in JSON format `{"users":[{"firstName":"David"}]`
- gRPC-Protobuf
  - Identify `grpc`
    - Accept request header
    -  request header
    - Access-control-expose-headers in the response header
  - gRPC messages are encoded using Protobuf, which is binary 
- Webhooks
  - Event-driven APIs that send information or perform a specific function in response to a trigger (e.g. time of the day, clicking a button, receiving a form submission)
    - Identify 
      - Search for `webhooks` or `event subscriptions` on the documentation 
      - Find a reference on how to register a callback URL
      - Is there a list of events types that can trigger a webhook?
    
#### Documentation
- <https://smartbear.com/blog/soap-vs-rest-whats-the-difference/>
- <https://www.odata.org/documentation/>
- <https://www.howtographql.com/basics/1-graphql-is-the-better-rest/>
- <https://www.smashingmagazine.com/2016/09/understanding-rest-and-rpc-for-http-apis/>
- <https://www.soapui.org/docs/rest-testing/working-with-rest-services/>
- <https://cloud.google.com/blog/products/api-management/understanding-grpc-openapi-and-rest-and-when-to-use-them>
- <https://openapi.tools/>
- <https://developers.hubspot.com/docs/api/webhooks>

### Check for documentation

#### Automatic

##### Swagger
- <https://github.com/danielmiessler/SecLists/blob/master/Discovery/Web-Content/swagger.txt>
- `/openapi.json`

##### OData
- `/$metadata`

##### WADL
- `/application.wadl`
- `/application.wadl?detail=true`
- `/api/application.wadl`

##### WSDL
- ?wsdl or ?singleWsdl
  - [wsdl-wizard](https://github.com/portswigger/wsdl-wizard)
  - [SoapUI](https://www.soapui.org/)
  - [Wsdler](https://github.com/NetSPI/Wsdler)
  - `/_vti_bin/lists.asmx?WSDL`

##### GraphQL
- <https://graphql.org/learn/introspection/>
- <https://github.com/prisma-labs/get-graphql-schema>

#### Manual
- site:target.tld intitle:api | developer

### Search for APIs

#### Traffic Analysis
- REST
  - [Burp CE](https://portswigger.net/burp/communitydownload)
  - [ZAP](https://www.zaproxy.org/)
  - [mitmproxy](https://mitmproxy.org/)
- OData
  - [Burp CE](https://portswigger.net/burp/communitydownload)
  - [ZAP](https://www.zaproxy.org/)
  - [mitmproxy](https://mitmproxy.org/)
- GraphQL
  - [Burp CE](https://portswigger.net/burp/communitydownload)
  - [ZAP](https://www.zaproxy.org/)
- SOAP
  - [Burp CE](https://portswigger.net/burp/communitydownload)
- XML-RPC
  - [Burp CE](https://portswigger.net/burp/communitydownload)
  - [mitmproxy](https://mitmproxy.org/)
- JSON-RPC
  - [Burp CE](https://portswigger.net/burp/communitydownload)
  - [mitmproxy](https://mitmproxy.org/)
- gRPC-Protobuf
  - [mitmproxy](https://mitmproxy.org/)
  - [Wireshark](https://www.wireshark.org/)
    - `echo HEX_STREAM | xxd -r -p | protoc --decode_raw`
    - [protoc](https://google.github.io/proto-lens/installing-protoc.html)
    - [Wireshark Protobuf Dissector](https://github.com/128technology/protobuf_dissector)
  - [gRPC UI](https://github.com/fullstorydev/grpcui)
  - [ZAP - gRPC Support](https://www.zaproxy.org/docs/desktop/addons/grpc-support/)

#### Android apps
- [apkleaks](https://github.com/dwisiswant0/apkleaks)
- [APKEnum](https://github.com/shivsahni/APKEnum)
- [MobSF](https://github.com/MobSF/Mobile-Security-Framework-MobSF)

#### Wayback Machine
- <https://archive.org/web/>
- [waybackurls](https://github.com/tomnomnom/waybackurls)
- [gau](https://github.com/lc/gau)
- [waymore](https://github.com/xnl-h4ck3r/waymore)

#### Path Manipulation
- /api/v1/
- /api/v2/
- /api/v3/
- /api/
- /api/private
- /api/partner
- /api/test
- api.target.com/v1
- api.target.com/v2
- api.target.com/v3

#### Key/Token identification/Testing

- [Api-Guesser](https://api-guesser.netlify.app/)
- [Keyhacks](https://github.com/streaak/keyhacks)
- [all-about-apikey](https://github.com/daffainfo/all-about-apikey)

#### Dorks

##### Google
- `site:target.tld inurl:api`
- `intitle:"index of" "api.yaml" site:target.tld`
- REST
  - `site:target.tld inurl:api | site:*/rest | site:*/v1 | site:*/v2 | site:*/v3`
- GraphQL
  - `site:target.tld inurl:graphql`
- WADL
  - `inurl:/application.wadl`
  - `user filetype:wadl`
  - `ext:wadl`
- WSDL
  - `user filetype:wsdl`
  - `ext:wsdl`
- Odata
  - `inurl:/%24metadata`
- Webhooks
  - `inurl:docs webhook`

##### Github
- <https://github.com/search?q=target.tld+%2Bapi>
- WADL
  - <https://github.com/search?q=target.tld+application.wadl&type=code>
- WSDL
  - <https://github.com/search?q=target.tld+%2A.wsdl&type=code>

#### Secrets
- `intitle:"index of" intext:"apikey.txt" site:target.tld`
- `allintext:"API_SECRET*" ext:env | ext:yml site:target.tld`
- [truffleHog](https://github.com/dxa4481/truffleHog)
- [shhgit](https://github.com/eth0izzle/shhgit)
- [PostLeaks](https://github.com/cosad3s/postleaks?tab=readme-ov-file)
- [Porch Pirate](https://github.com/MandConsultingGroup/porch-pirate)
- [js-snitch](https://github.com/vavkamil/js-snitch)

#### API Directories

- [API list](https://apilist.fun/)
- [API Harmony](https://apiharmony-open.mybluemix.net/public)
- [ProgrammableWeb](https://www.programmableweb.com/)
- [RapidAPI Hub](https://rapidapi.com/hub)
- [APIs.io](http://apis.io/)
- [SwaggerHub](https://app.swaggerhub.com/search)
- [APIs.guru](https://apis.guru/)
- [Postman Public API Network](https://www.postman.com/explore/apis)
- [Any API](https://any-api.com/)
- [SmartAPI Registry](https://smart-api.info/registry)
- [API Stack](https://www.apistack.io/)
- [Public APIs](https://public-apis.xyz/)

### Enumerate endpoints / methods

#### Endpoints

##### GraphQL
- <https://github.com/danielmiessler/SecLists/blob/master/Discovery/Web-Content/graphql.txt>

##### Swagger
- <https://github.com/danielmiessler/SecLists/blob/master/Discovery/Web-Content/swagger.txt>

##### Other
- <https://github.com/danielmiessler/SecLists/blob/master/Discovery/Web-Content/api/api_endpoints.txt>
- <https://s3.amazonaws.com/assetnote-wordlists/data/automated/httparchive_apiroutes_2020_11_20.txt>
- <https://github.com/chrislockard/api_wordlist>

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

##### Kiterunner
- `kr scan TARGET.TLD -w routes.kite -A=apiroutes-210228:20000 -x 10 --ignore-length=34`
- <https://github.com/assetnote/kiterunner>

##### graphw00f
- `python3 main.py -f -d -t http://localhost:5000`
- <https://github.com/dolevf/graphw00f>

##### clairvoyance
- `python3 -m clairvoyance -vv -o schema.json -w wordlist.txt https://api-example/graphql`
- <https://github.com/nikitastupin/clairvoyance>

##### json2paths
- `j2p -p http://example.com/+burp.xml`
- <https://github.com/s0md3v/dump/tree/master/json2paths>

##### feroxbuster
- <https://github.com/epi052/feroxbuster>

##### wfuzz
- `wfuzz -z file,/usr/share/wordlists/api_list.txt https://targetname.com/FUZZ`
- <https://github.com/xmendez/wfuzz>

##### ReconAIzer
- <https://github.com/hisxo/ReconAIzer>

##### JS Miner
- [Detecting API endpoints and source code with JS Miner](https://danaepp.com/detecting-api-endpoints-and-source-code-with-js-miner)
- <https://github.com/minamo7sen/burp-JS-Miner>

##### GoBuster
- `gobuster vhost -k --append-domain -u TARGET.TLD -w wordlist.txt`
- <https://github.com/OJ/gobuster>

##### katana
- `cat subdomains_list.httpx | katana -mdc 'contains(endpoint, "api")' -o katana_api_output`
- <https://github.com/projectdiscovery/katana>

##### Sasori
- `sasori start -c config.json -o sasori_output.txt`
- <https://github.com/karthikuj/sasori>

### Supported Content Types

- Play with request URL
  - Requested resource extension e.g. replacing `.json` by `.xml`
  - Query string e.g. replacing `?json` by `?xml` or `?format=json` by `?format=xml`
- Play with `` request header and payload
  - Without ``, submit either `json`, `xml`, ...
  - Changing `Content-Type` and payload accordingly

### Data visualization
- [JSON Crack](https://jsoncrack.com/editor)

## Testing

### Broken Object Level Authorization

#### Endpoint receives an ID?

##### Understand the pattern
- Sequential
- Encoded
- UUID (aka GUID)
- Composite IDs
- Hashed
- Randomly Generated Strings
- Temporal

##### Tamper

###### Change
- Next/Previous value
- Compute/Predict (e.g. UUIDv1)
- Data Type
  - Is it a number? Change it to a string
  - Is it a string? Change it to a number
- Method
  - GET to POST
  - GET to PUT
  - GET to PATCH 
- Base64 encoded?
  - Decoded it, modify it, encode it again

###### Duplicate
- ?id=1&id=2

###### Add as an array
- ?id[]=1&id[]=2

###### Wildcard
- GET /users/id -> GET /users/*

###### Cross-deployments IDs
- Identify other deployments (hosts) of your target API
- Enumerate resources IDs (often non- numerical/sequential ones)
- Test those IDs on your target API host

#### Check the response

#### Tools
- REST APIs
  - [Astra](https://github.com/flipkart-incubator/Astra)
  - [apidor](https://github.com/bncrypted/apidor)
  - [AuthMatrix](https://github.com/SecurityInnovation/AuthMatrix)
  - [Autorize](https://github.com/PortSwigger/autorize)
  - [Auth Analyzer](https://github.com/portswigger/auth-analyzer)
  - [Susanoo](https://github.com/ant4g0nist/Susanoo)
  - [OFFAT](https://github.com/OWASP/OFFAT/)
  - [sj](https://github.com/BishopFox/sj)
- GraphQL
  - [InQL](https://github.com/doyensec/inql)
  - [graphql-path-enum](https://gitlab.com/dee-see/graphql-path-enum)
  - [AutoGraphQL](https://graphql-dashboard.herokuapp.com/)
- gRPC-protobuf
  - [ProtoFuzz](https://github.com/trailofbits/protofuzz)
- UUIDs
  - [guid_reaper.py](https://gist.github.com/DanaEpp/8c6803e542f094da5c4079622f9b4d18) ([read more](https://danaepp.com/attacking-predictable-guids-when-hacking-apis))

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

###### Multiple JWT test cases

- jwt_tool
  - `python3 jwt_tool.py -t https://api.example.com/api/working_endpoint -rh "Content-Type: application/json" -rh "Authorization: Bearer [JWT]" -M at`
  - <https://github.com/ticarpi/jwt_tool>

###### Test JWT secret brute-forcing
- jwt_tool
  - `python3 jwt_tool.py <JWT> -C -d <Wordlist>`
  - <https://github.com/ticarpi/jwt_tool>
- jwt_cracker
  - `jwt-cracker <JWT> <Alphabet> <Max length>` 
  - <https://github.com/lmammino/jwt-cracker>
- jwtcat
  - `python jwcat.py brute-force <JWT>`
  - `python jwcat.py wordlist -w <Wordlist> <JWT>`
  - <https://github.com/aress31/jwtcat>
- [JWT Heartbreaker](https://github.com/wallarm/jwt-heartbreaker)
- gojwtcrack
  - `cat rockyou.txt | ./gojwtcrack -t mytoken.txt`
  - <https://github.com/x1sec/gojwtcrack>

###### Abusing JWT Public Keys Without knowing the Public Key
- [rsa_sig2n](https://github.com/silentsignal/rsa_sign2n)

###### Test if algorithm could be changed
- Change algorithm to None
  - jwt_tool
    - `python3 jwt_tool.py <JWT> -X a`
    - <https://github.com/ticarpi/jwt_tool>
  - jwtcat
    - `python jwcat.py vulnerable <JWT>`
    - <https://github.com/aress31/jwtcat>
- Change algorithm from RS256 to HS256
  - jtw_tool
    - `python3 jwt_tool.py <JWT> -S hs256 -k public.pem`
    - <https://github.com/ticarpi/jwt_tool>  
  - jwtcat
    - `python jwcat.py vulnerable <JWT>`
    - <https://github.com/aress31/jwtcat>
- [jwt.io](https://jwt.io/#debugger-io)
- [JSON Web Token Attacker](https://portswigger.net/bappstore/82d6c60490b540369d6d5d01822bdf61)

###### Test if signature is being validated
- jwt_tool
  - `python3 jwt_tool.py <JWT> -I -pc <Key> -pv <Value>`
  - <https://github.com/ticarpi/jwt_tool>
- jtwXploiter
  - `jwtxpl <JWT> -a hs256 -p <key>:<value> --unverified`
  - <https://github.com/DontPanicO/jwtXploiter> 

###### Test token expiration time (TTL, RTTL)

###### Test if sensitive data is in the JWT
- [jwt.io](https://jwt.io/#debugger-io)

###### Check for Injection in "kid" element
- jwt_tool
  - `python3 jwt_tool.py <JWT> -I -hc kid -hv "../../dev/null" -S hs256 -p ""` 
  - <https://github.com/ticarpi/jwt_tool>
- jwtXploiter
  - `jwtxpl <JWT> -a hs256 -p <key>:<value> --inject-kid "../../dev/null"`
  - <https://github.com/DontPanicO/jwtXploiter>

###### Check for time constant verification for HMAC

###### Check that keys and secrets are different between ENV

##### OAuth
- Test redirect_uri
  - Open redirects
    - Common issues
      - `?redirect_uri=https://atttacker.com`
      - `?redirect_uri=https://ATTACKER.TARGET.TLD`
      - `?redirect_uri=https://ALLOWED_HOST.com/callback?redirectUrl=https://attacker.com`
      - `?redirect_uri=https://TARGET.TLD.attacker.com`
      - `?redirect_uri=https://TARGET.TLD%252eattacker.com`
      - `?redirect_uri=https://TARGET.TLD//attacker.com/`
    - Fuzz
      - `?redirect_uri=https://TARGET.TLD§FUZZ§`
      - `?redirect_uri=https://§FUZZ§TARGET.TLD`
      - [URL validation bypass cheat sheet](https://portswigger.net/web-security/ssrf/url-validation-bypass-cheat-sheet)
  - XSS
- Test the existence of response_type=token
- Testing state
  - Missing state parameter?
    - CSRF
      - Generate a valid `authorization_code` and don't use it
        - Send the crafted CSRF page to TARGET
  - Predictable state parameter?
  - Is state parameter being verified?
- If you revocate access, will code be also revocated?
- Credential leakage
  - Check the Referer header
  - Check the browser history 

##### Basic Auth

### Excessive Data Exposure

#### Check if the API returns full data objects from database with sensitive data
- [apicheck](https://github.com/BBVA/apicheck)
- [OFFAT](https://github.com/OWASP/OFFAT/)

#### Compare client data with the API response to check if the filtering is done by client side

#### Sniff the traffic to check for sensitive data returned by the API
- [Burp CE](https://portswigger.net/burp/communitydownload)
- [ZAP](https://www.zaproxy.org/)
- [mitmproxy](https://mitmproxy.org/)
- [Wireshark](https://www.wireshark.org/)

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
  - [OFFAT](https://github.com/OWASP/OFFAT/) 
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
- [OWASP ZAP](https://www.zaproxy.org/)

#### CORS is well configured?
- [Astra](https://github.com/flipkart-incubator/Astra)
- [API Fuzzer](https://github.com/Fuzzapi/API-fuzzer)
- Test Same Origin Policy (SOP): Modify the value of the Origin request header to reflect a different or seemingly untrusted website, and verify if the request is successfully processed

#### Force an error to see if any sensitive information is exposed

#### GraphQL

- [Introspection Query and/or GraphiQL is enabled](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html#introspection-graphiql)
  - [BatchQL](https://github.com/assetnote/batchql) 
  - [graphql-cop](https://github.com/dolevf/graphql-cop)
- GraphQL server provides fields name hints
  - [graphql-cop](https://github.com/dolevf/graphql-cop)
- [Query batching is enabled without limit](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html#batching-attacks)
  - [BatchQL](https://github.com/assetnote/batchql) 
  - [graphql-cop](https://github.com/dolevf/graphql-cop)
- [Unlimited Depth and/or Amount](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html#query-limiting-depth-amount)

### Injection 

#### Test if user input is validated, filtered, or sanitized by the API
- REST APIs
  - [Astra](https://github.com/flipkart-incubator/Astra)
  - [API Fuzzer](https://github.com/Fuzzapi/API-fuzzer)
  - [TnT-Fuzzer](https://github.com/Teebytes/TnT-Fuzzer)
  - [APIFuzzer](https://github.com/KissPeter/APIFuzzer)
  - [Susanoo](https://github.com/ant4g0nist/Susanoo)
  - [REcollapse](https://github.com/0xacb/recollapse)
  - [OFFAT](https://github.com/OWASP/OFFAT/)
- GraphQL
  - [GraphQLmap](https://github.com/swisskyrepo/GraphQLmap)
  - [graphql-cop](https://github.com/dolevf/graphql-cop)
  - [REcollapse](https://github.com/0xacb/recollapse)
  - [CrackQL](https://github.com/nicholasaleks/CrackQL)
- gRPC-protobuf
  - [ProtoFuzz](https://github.com/trailofbits/protofuzz)

#### Test if client data is used or concat into DB queries, OS commands, etc
- REST APIs
  - [Astra](https://github.com/flipkart-incubator/Astra)
  - [API Fuzzer](https://github.com/Fuzzapi/API-fuzzer)
  - [TnT-Fuzzer](https://github.com/Teebytes/TnT-Fuzzer)
  - [APIFuzzer](https://github.com/KissPeter/APIFuzzer)
  - [Susanoo](https://github.com/ant4g0nist/Susanoo)
  - [OFFAT](https://github.com/OWASP/OFFAT/)
- GraphQL
  - [GraphQLmap](https://github.com/swisskyrepo/GraphQLmap)
- gRPC-protobuf
  - [ProtoFuzz](https://github.com/trailofbits/protofuzz)

#### Check if incoming data from external systems is validated, filtered, or sanitized by the API

### Improper Assets Management
- Check for the API documentation (MindAPI recon can help you here)
  - REST APIs
    - `oasdiff diff openapi-test1.yaml openapi-test5.yaml -f text`
    - <https://www.oasdiff.com/diff-calculator>
    - <https://github.com/Tufin/oasdiff>
    - [Detecting new API endpoints with oasdiff](https://danaepp.com/detecting-new-api-endpoints-with-oasdiff)
- Hosts inventory is missing or outdated.
- Integrated services inventory, either first- or third-party, is missing or outdated.
- Old or previous API versions are running unpatched.
- The aspects of the API (e.g. name, purpose, owner, description, authentication, endpoints, versioning, redirects, errors, parameters, rate-limiting, request and response formats, etc) are missing or outdated.
- If the API documentation is exposed to the internet, implement an access control mechanism (e.g. login portal) to ensure that only authorized users access the OpenAPI specification or even to the documentation as a whole.
- If your API shares data with a third-party or you are consuming a third-party API, make sure to include it in the inventory.

### API Testing tools
- [Postman](https://www.postman.com/downloads/)
- [Bruno](https://www.usebruno.com/downloads)
- [Insomnia](https://insomnia.rest/products/insomnia)
- [HTTPie](https://httpie.io)
- [Hoppscotch](https://hoppscotch.io/)
- [BurpSuite](https://portswigger.net/burp/communitydownload)
- [API Tester](https://apitester.org/)
- [Scalar](https://scalar.com/)
