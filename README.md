## The Lambda

This is supposedly the lambda calculus version of [the natural number game](https://www.ma.imperial.ac.uk/~buzzard/xena/natural_number_game/) but lacking good lambda calculus library to parse, check, including every other process needed. this is still in demo.

The issue is that a function of certain goal can have multiple forms, hence harder to judge by comparing function. The grading method for solution might need to be case-based like competitive programming grader. For example, boolean and function can look like either `lambda p. lambda q. p q p` or `lambda p. lambda q. p q lambda x. lambda y. y` This two function is not similar (?) regardless of variable names.

This game is initially planned to guide player through the creation of boolean, number, and data-structure in the world of lambda calculus, which the side tracks might include SK-calculus or calculus in other basis. However, the basic of grading and interpreting lambda string is still problematic
