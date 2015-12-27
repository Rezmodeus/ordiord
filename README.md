# ordiord

##Installation

###Install brew
	ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

### Reinstall watchman
	brew update
	brew install watchman
	
### Do initial build
	npm run bundle-ios

### Open xcode project
	npm run ios-open
	
### Run project from xcode
### Do some react redux magic!