### TODO

#### Separate force for labels

a la https://d19jftygre6gh0.cloudfront.net/mapio/53fed7d84cd1812d6a6639ed7aa83868

Three layers total:

- keep core geometry symmetric (back to the original nice one)
- keep core labels symmetric as well
- let sub labels be more wild

1. core geometry (as was)
2. core labels (anchor fx fy on related core stage, then loose node for label)
3. sub labels (anchor fx fy on related core label, then loose node for label)

See branch `seeking-original` for that sweet clean geometry

Commit `db76ee3 WIP: get something, start something new`
