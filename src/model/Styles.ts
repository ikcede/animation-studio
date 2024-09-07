export type Style = {
  property: string;
  value: string;
  autoFocus?: boolean;
};

export default class Styles {
  static emptyStyle(): Style {
    return {
      property: '',
      value: '',
      autoFocus: false,
    };
  }

  static toCSSString(styles: Style[]): string {
    let out = '';
    for (let i = 0; i < styles.length; i++) {
      // Only write non-empty styles
      if (
        styles[i].property.trim().length > 0 &&
        styles[i].value.trim().length > 0
      ) {
        out += `${styles[i].property}: ${styles[i].value}; `;
      }
    }
    return out;
  }

  static buildFromDeclaration(declaration?: CSSStyleDeclaration): Style[] {
    let styles = new Array<Style>();
    if (declaration === undefined) {
      return styles;
    }

    let regex = /([\w-]*)\s*:\s*([^;]*)/g;
    let match;

    while ((match = regex.exec(declaration.cssText)) !== null) {
      styles.push({
        property: match[1].trim(),
        value: match[2].trim(),
      });
    }

    return styles;
  }
}

/* Old styles class, deprecated

export type Properties = {
  [prop: string]: string;
};

export default class Styles {
  styles: Style[] = [];

  constructor(styleDeclaration?: CSSStyleDeclaration) {
    if (styleDeclaration !== undefined) {
      this.updateWithStyle(styleDeclaration);
    }
  }

  toString(): string {
    let out = '';
    for (let i = 0; i < this.styles.length; i++) {
      out += `${this.styles[i].prop}: ${this.styles[i].val}; `;
    }
    return out;
  }

  static getPropertiesFromDeclaration(declaration: CSSStyleDeclaration) {
    let regex = /([\w-]*)\s*:\s*([^;]*)/g;
    let match;
    let properties = <Properties>{};

    while ((match = regex.exec(declaration.cssText)) !== null) {
      properties[match[1].trim()] = declaration.getPropertyValue(
        match[1].trim()
      );
    }

    return properties;
  }

  // Converts a CSSStyleDeclaration to Properties
  // Works more accurately because it pulls the parsed value
  updateWithStyle(style: CSSStyleDeclaration) {
    return this.syncToProperties(
      Styles.getPropertiesFromDeclaration(style)
    );
  }

  syncToProperties(properties: Properties): number {
    let clone = Object.assign({}, properties);

    for (let i = 0; i < this.styles.length; i++) {
      let style = this.styles[i];
      if (clone[style.prop] !== undefined) {
        style.val = clone[style.prop];
        delete clone[style.prop];
      } else {
        if (properties[style.prop] !== undefined) {
          // style.error = 'Duplicate property';
        }
      }
    }

    for (let key of Object.keys(clone)) {
      this.styles.push({
        prop: key,
        val: clone[key],
      });
    }

    return this.styles.length;
  }
}
*/
