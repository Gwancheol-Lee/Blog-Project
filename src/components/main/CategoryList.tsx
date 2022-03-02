import React, { FunctionComponent, ReactNode } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

export type CategoryListProps = {
    selectedCategory: string,
    categoryList: {
        //프로퍼티 이름은 문자열, 프로퍼티 값은 숫자임을 나타내는 타입 표기 방법
        [key: string]: number
    }
}

type CategoryItemProps = {
    active: boolean;
}

type GatsbyLinkProps = {
    children: ReactNode;
    className?: string;
    to: string;
} & CategoryItemProps

const CategoryListWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 768px;
    margin: 100px auto 0;

    @media (max-width: 768px) {
        width: 100%;
        margin-top: 50px;
        padding: 0 20px;
    }
`
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CategoryItem = styled(({ active, ...props }: GatsbyLinkProps) => (
    <Link {...props} />
))<CategoryItemProps>`
    margin-right: 20px;
    padding: 5px 0; 
    font-size: 18px;
    font-weight: ${({ active }) => (active ? '800' : '400')};
    cursor: pointer;

    &:last-of-type {
        margin-right: 0;
    }

    @media (max-width: 768px) {
        font-size: 15px;
    }
`

// Object.prototype.entries => 자바스크립트 표준 API 메서드. 객체의 열거 가능한 속성들을 [key, value] 쌍의 값들을 가진 배열을 반환하는 기능을 가지고 있음
const CategoryList: FunctionComponent<CategoryListProps> = function ({
    selectedCategory,
    categoryList,
}) {
    return(
        <CategoryListWrapper>
            {Object.entries(categoryList).map(([name, count]) => (
                <CategoryItem
                    to={`/?category=${name}`}
                    active={name === selectedCategory}
                    key={name}
                >
                    #{name}({count})
                </CategoryItem>
            ))}
        </CategoryListWrapper>
    )
}

export default CategoryList