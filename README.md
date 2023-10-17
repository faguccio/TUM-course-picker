# TUM-course-picker

Since choosing TUM MSc Informatik courses (between area ETCS, overlapping schedules and THEO) was very hard, I made a simple and extremely experimental project to get a grasp on the courses. 

## Usage

### Installation

The project is written in `node`. You should have `bun` installed on your system. If you are using something else (like `npm`, `yarn` or `deno`) go change the `package.json` file in the `script` section.


To install dependencies:

```bash
bun install
```

### Add URLs

You should manually create `courses.json`, adding

- the link of the course you are taking in consideration
- the amount of etcs 
- if the course is a theoretical one. 
- you should also put the course inside the right area.

It would be very nice to integrate [this project](https://vuenc.github.io/TUM-Master-Informatics-Offered-Lectures/informatics-ws23-24.html) which does that work for every courses (I was in hurry).

### Scrape

To scrape and generate `courses-info.json`

```bash
bun scrape
```

### Generate HTML 


```
bun start
```

> Even if you already generated the index.html file you should use the command. That's because I'm fetching the local json.
