# Aposanity
The missing Apostrophe 2 toolset

You will need to have bun installed.

## Commands
| Command | Description                                             |
|---------|---------------------------------------------------------|
| help    | Shows this help; use --help to get help for any command.|
| init    | Creates an empty .aposanity.json file.                  |
| info    | Displays the available sites.                           |
| pulldb  | Fetches the database for a given site.                  |
| pushdb  | Write the database from a given site to another site.   |
  
## .aposanity.json
Sites are configured either using local .aposanity files or a global one stored
in your user directory.

Use `init` to create a blank config.

Each site can have the following options:

```
host: The host of the site's server
port: The site's mongodb port
user: The user used to interact with the site
database: The name of the database
protected: If true, prevents writing files/database to the site
useSSH: If true, uses SSH to push/pull database and files
version: The version of Apostrophe used
```

### What Works:
* Pulling DB from SSH or MongoDB
* Pushing DB to MongoDB (SSH not yet supported)

### What's in the works:
* Pulling Files
* Pushing DB to SSH
* Running admin commands, like creating a user
* Interactive with both local and global storage sites
* Clean-up of files
* Keeping backups
