// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { toString } from "mdast-util-to-string";
import getReadingTime from "reading-time";

export function readingTimeRemarkPlugin() {
	return (tree, file) => {
		const textOnPage = toString(tree);
		const readingTime = Math.ceil(getReadingTime(textOnPage).minutes);

		file.data.astro.frontmatter.readingTime = readingTime;
	};
}
