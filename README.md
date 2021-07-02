# CSS-class-builder for VS Code

The extension will generate the styles from the given classes.

![css-builder-working](https://user-images.githubusercontent.com/31626278/124123718-3f2f9f80-da95-11eb-9000-19d9080888d3.gif)


# Usage
alignSelf_flexEnd

Where: 
1. **alignSelf**- property 
2. **_** - separator 
3. **flexEnd**- value

# Requirements
1. The given class should be in camel case.
2. Make sure your separator is unique to avoid collision with the other classes.

# Configuration
     
you can change your separator from the default value of '_'.
  
```javascript
"css-class-builder" : {
  "seperator": "_"
}
```

# Known Issues
1. It will only be applicable for HTML files.
2. It can't generate the styles for the classes inside the script tag. 

# License
This project is licensed under the [MIT License](https://github.com/AlwarG/css-class-builder/blob/main/LICENSE).
