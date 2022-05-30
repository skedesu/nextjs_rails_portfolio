AdminUser.first_or_create(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?

user = User.first_or_create(
  email: 'ske@xxxxxxxx.example.com',
  password: 'xxxxxxxx',
  password_confirmation: 'xxxxxxxx'
)

Language.first_or_create([
                          {
                            id: 1,
                            user_id: user.id,
                            name: 'Ruby on Rails',
                            from: '2018/10',
                            remark: 'Best'
                          },
                          {
                            id: 2,
                            user_id: user.id,
                            name: 'JavaScript',
                            from: '2018/10',
                            remark: ''
                          },
                          {
                            id: 3,
                            user_id: user.id,
                            name: 'React',
                            from: '2020/3',
                            remark: ''
                          },
                          {
                            id: 4,
                            user_id: user.id,
                            name: 'Node.js',
                            from: '2021/10',
                            remark: ''
                          },
                          {
                            id: 5,
                            user_id: user.id,
                            name: 'Next.js',
                            from: '2022/4',
                            remark: ''
                          },
                          {
                            id: 6,
                            user_id: user.id,
                            name: 'Python',
                            from: '2020/4',
                            remark: ''
                          },
                          {
                            id: 7,
                            user_id: user.id,
                            name: 'PyTorch, Keras',
                            from: '2022/1',
                            remark: ''
                          },
                          {
                            id: 8,
                            user_id: user.id,
                            name: 'Docker',
                            from: '2020/3',
                            remark: ''
                          },
                          {
                            id: 9,
                            user_id: user.id,
                            name: 'GraphQL',
                            from: '2022/4',
                            remark: ''
                          },
                        ])
