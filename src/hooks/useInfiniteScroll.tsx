import { MutableRefObject, useState, useEffect, useRef, useMemo } from 'react'
import { PostListItemType } from 'types/PostItem.types'

export type useInfiniteScrollType = {
    containerRef: MutableRefObject<HTMLDivElement | null>
    postList: PostListItemType[]
}

const NUMBER_OF_ITEMS_PER_PAGE = 10

const useInfiniteScroll = function (
    selectedCategory: string,
    posts: PostListItemType[]
): useInfiniteScrollType {
    const containerRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement> ( null ) 
    const [count, setCount] = useState<number>(1)
    const postListByCategory = useMemo<PostListItemType[]>(
        console.log("Test");
        () => posts.filter(({ node: { frontmatter: { categories } } }: PostListItemType) =>
            selectedCategory !== 'All'
                ? categories.includes(selectedCategory)
                : true
        ), [selectedCategory] 
    )
    
    const observer: IntersectionObserver = new IntersectionObserver(
        console.log("Test");
        (entries, observer) => {
            if (!entries[0].isIntersecting) return;
            
            setCount(value => value + 1);
            observer.disconnect();
        }
    )

    useEffect(() => {
        if (
            NUMBER_OF_ITEMS_PER_PAGE * count >= postListByCategory.length ||
            containerRef.current === null ||
            containerRef.current.children.length === 0
        ) return

        observer.observe(
            containerRef.current.children[containerRef.current.children.length - 1]
        )
        console.log("Test");
    }, [count, selectedCategory])

    return { 
        containerRef, 
        postList: postListByCategory.slice(0, count * NUMBER_OF_ITEMS_PER_PAGE)
    }
}

export default useInfiniteScroll
