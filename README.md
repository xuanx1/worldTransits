# Transits of the World

A [catalogue](https://xuanx1.github.io/worldTransits/) of the world's city rail maps, intercity lines and ferries: official
network maps, every line's track and stations, timetables, and a schematic world
map of drawn rail diagrams.

This repository is the **light copy** of the site: about 1.2 GB of files, about
0.8 GB as git stores them (the full project serves ~5 GB). It is generated from the full working project by
`scripts/make_light_copy.py` there; edit the project and regenerate rather than
editing here.

## Running it

Open `index.html` in a browser, or serve the folder:

```
python -m http.server 8000
```

then visit http://localhost:8000/. GitHub Pages (branch `main`, folder `/`;
`.nojekyll` skips Jekyll) can serve it too, though at ~1.2 GB the site is over
Pages' stated 1 GB limit for published sites.

## How it differs from the full project

- **Left out:** original files (`raw/` folders: source PDFs, full-resolution
  scans), Yandex's raw scheme data, fetch state, and the update pipeline
  (`scripts/` and its cached reference data).
- **Map images** larger than 3000 px are scaled down; JPEGs re-saved at quality
  75, large PNGs reduced to 256 colours where that is smaller. China's
  network/planning map pairs are kept exactly, since they are aligned pixel to
  pixel.
- **Intercity track** is simplified to about 40 m (city lines to about 5 m), and
  coordinates rounded to about 1 m.
- **Ferry coastlines** in the journey graphic are simplified to about 3 px at
  the size they are drawn, rivers to about 6 px, and river pieces too short to
  see are dropped.

Every page, line, ferry, timetable and map of the full project is here.

## Credits

Every source and licence is listed in `pages/attributions.html`.
