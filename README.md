# json-splicer

Exploratory work on parsing JSON fast and potentially streaming it.

## Setup

Install wrk, yarn, and node modules.

```sh
brew install wrk
brew install yarn
cd json-slicer
yarn
```

Create a `.env` file with the following contents:

```
ISMDS_APIKEY=your_api_key
ISMDS_APISECRET=your_api_secret
ISMDS_URL=http://services-url/api/ismds
```

## Usage

Start the server.

```sh
yarn run start
```

## wrk Examples

### Service Calls

wrk results where we stream the data response chunks from a facets call to stream-json

```sh
$ wrk --latency -t 1 -d 10s -c 10 http://localhost:3000/ismds/stream-json/stream/facets/3F005359ACB33C1D
Running 10s test @ http://localhost:3000/ismds/stream-json/stream/facets/3F005359ACB33C1D
  1 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   743.27ms  302.79ms   1.71s    66.20%
    Req/Sec    12.43      5.57    20.00     69.57%
  Latency Distribution
     50%  745.39ms
     75%  905.05ms
     90%    1.11s
     99%    1.71s
  83 requests in 10.02s, 1.80MB read
  Socket errors: connect 0, read 0, write 0, timeout 12
Requests/sec:      8.28
Transfer/sec:    184.15KB
```

wrk results where we wait for a facets call to complete, then send to stream-json

```sh
$ wrk --latency -t 1 -d 10s -c 10 http://localhost:3000/ismds/stream-json/await/facets/3F005359ACB33C1D
Running 10s test @ http://localhost:3000/ismds/stream-json/await/facets/3F005359ACB33C1D
  1 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.15s   143.78ms   1.22s    98.04%
    Req/Sec     6.57      2.51     8.00     71.43%
  Latency Distribution
     50%    1.17s
     75%    1.20s
     90%    1.21s
     99%    1.22s
  61 requests in 10.06s, 1.28MB read
  Socket errors: connect 0, read 0, write 0, timeout 10
Requests/sec:      6.07
Transfer/sec:    130.68KB
```

### Local String

wrk results for sending facets as a raw unparsed string

```
$ wrk --latency -t 1 -d 10s -c 10 http://localhost:3000/raw/facets
Running 10s test @ http://localhost:3000/raw/facets
  1 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     4.75ms    1.92ms  26.82ms   84.64%
    Req/Sec     2.14k   284.93     2.56k    72.00%
  Latency Distribution
     50%    3.94ms
     75%    5.04ms
     90%    7.44ms
     99%   12.18ms
  21361 requests in 10.00s, 4.30GB read
Requests/sec:   2135.05
Transfer/sec:    439.98MB
```

Using `JSON.stringify(JSON.parse(facets))`:

```
$ wrk --latency -t 1 -d 10s -c 10 http://localhost:3000/parsed/facets
Running 10s test @ http://localhost:3000/parsed/facets
  1 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    40.64ms   10.06ms 115.40ms   90.18%
    Req/Sec   246.97     20.67   282.00     83.00%
  Latency Distribution
     50%   38.23ms
     75%   41.17ms
     90%   49.69ms
     99%   78.78ms
  2467 requests in 10.03s, 505.02MB read
Requests/sec:    245.85
Transfer/sec:     50.33MB
```

Using `stream-json` and piping an array of `facets`:

```
$ wrk --latency -t 1 -d 10s -c 10 http://localhost:3000/stream-json/facets
Running 10s test @ http://localhost:3000/stream-json/facets
  1 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   877.97ms  174.61ms   1.86s    97.20%
    Req/Sec    10.91      1.87    12.00     90.91%
  Latency Distribution
     50%  844.81ms
     75%  865.95ms
     90%  879.27ms
     99%    1.86s
  107 requests in 10.03s, 2.37MB read
Requests/sec:     10.67
Transfer/sec:    242.45KB
```
