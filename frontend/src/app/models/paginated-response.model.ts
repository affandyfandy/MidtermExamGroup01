export interface PaginatedResponse<T> {
    totalPages?: number;
    totalElements?: number;
    numberOfElements?: number;
    pageable?: {
        pageNumber?: number;
        pageSize?: number;
        sort?: {
            unsorted?: boolean;
            sorted?: boolean;
            empty?: boolean;
        };
        offset?: number;
        unpaged?: boolean;
        paged?: boolean;
    };
    first?: boolean;
    last?: boolean;
    size?: number;
    content?: T[];
}