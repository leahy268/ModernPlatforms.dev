'use client';
 
import Giscus from '@giscus/react';
 
const Comments = ({ repo, repoId, category, categoryId, datamapping }) => {
	return (
		<Giscus
			repo={repo}
			repoId={repoId}
			category={category}
			categoryId={categoryId}
			mapping={datamapping}
			reactionsEnabled="1"
			emitMetadata="0"
			inputPosition="top"
			theme="preferred_color_scheme"
			lang="en"
			loading="lazy"
		/>
	);
};
 
export default Comments;