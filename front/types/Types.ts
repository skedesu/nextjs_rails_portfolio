export interface TASK {
  node: {
    __typename: string
    userId: number
    id: number
    detail: string
    priority: number
    completedAt: string
    expireData: string
    createdAt: string
    updatedAt: string
  }
}

export interface LANGUAGE {
  __typename: string
  id: number
  language: string
  experience: string
  from: string
  remark: string
}
