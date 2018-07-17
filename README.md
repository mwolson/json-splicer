# json-splicer

Exploratory work on parsing JSON fast and potentially streaming it.

## Usage

Install wrk, yarn, and node modules. Start the server.

```sh
brew install wrk
brew install yarn
cd json-slicer
yarn
yarn run start
```

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
