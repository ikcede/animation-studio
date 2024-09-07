import { all as properties } from 'known-css-properties';

/**
 * Re-export list of all known properties as a set
 */
export const AllCSSProperties = new Set<string>(properties);

const filtered = properties.filter((e) => e[0] !== '-');
filtered.sort();

/**
 * Gets all known properties minus browser specific ones
 */
export const PureCSSProperties: string[] = filtered;
