+++
date = '2024-12-28T10:30:21+01:00'
title = 'The Cluck Compiler'
tags = ['showcase']
topics = ['haskell', 'llvm', 'c', 'compilers']
featured = true
+++

A C compiler implemented with Haskell and LLVM for my Computer Science NEA - my most ambitious project to date.

![A screenshot of C code and its corresponding LLVM IR in a code editor](/images/projects/cluck.png)

## Overview

In this project, I created a functional implementation of the C programming language.

Compilers are crucial tools in programming as they enable high-level code to be translated into low-level machine code that computers can execute. C is one of the most widely used and influential programming languages, conceptualised [over 50 years ago](https://en.wikipedia.org/wiki/The_C_Programming_Language) in the early age of compilers. C's high performance and close relationship with system-level operations makes it a popular choice for performance-critical applications.

This project focused on creating a custom C compiler compatible with a subset of C, concentrating on core language features such as basic types, arithmetic expressions, loops and conditional statements. By limiting the features of my subset, the compiler remained focused and feasible within the constraints of the project timeline while still addressing the essential principles of compiler development such as lexical analysis, parsing, semantic analysis and code generation.

The use of LLVM IR as the target output format enabled compatibility with a variety of different platforms and architectures while providing various optimisations to make programs more efficient.

I used Haskell as the implementation language due to its functional paradigm and algebraic data types, enabling me to easily represent different intermediate representations of the program as it passes through the various stages of compilation.

I worked closely with my third-party to ensure that my compiler met the project objectives and aligns with the needs of potential end users, incorporating their feedback throughout the development process. Through this project, I gained a deeper understanding of compilers and programming language theory, subsequently developing my skills in research, planning and software engineering.


## Features

The below program which implements the [sieve of Eratosthenes algorithm](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes) showcases some of the compiler's features.

```c
int main() {                                    // functions
  int N;                                        // variables
  printf("Enter N: ");                          // output
  scanf("%d", &N);                              // input

  if (N < 2) {                                  // if statements, infix binary expressions
    printf("N must be greater than 1\n");       // return statements
    return 1;
  }

  bool *A = (bool *)malloc(N * sizeof(bool));   // pointers, heap allocation, type casts

  int i;
  int max = (int)sqrt((float)N);

  for (i = 2; i <= max; i++) {
    if (!A[i]) {                                // for loops, array indexing
      int j = i * i;
      while (j <= N) {
        A[j] = true;                            // while loops
        j = j + i;
      }
    }
  }

  for (i = 2; i < N; i++) {
    if (!A[i]) {
      printf("%d ", i);
    }
  }
  printf("\n");

  free(A);

  return 0;
}
```

```sh
~/cluck$ ./cluck examples/primes.c
~/cluck$ ./primes
Enter N: 1000
2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97 101 103 107 109 113 127 131 137 139 149 151 157 163 167 173 179 181 191 193 197 199 211 223 227 229 233 239 241 251 257 263 269 271 277 281 283 293 307 311 313 317 331 337 347 349 353 359 367 373 379 383 389 397 401 409 419 421 431 433 439 443 449 457 461 463 467 479 487 491 499 503 509 521 523 541 547 557 563 569 571 577 587 593 599 601 607 613 617 619 631 641 643 647 653 659 661 673 677 683 691 701 709 719 727 733 739 743 751 757 761 769 773 787 797 809 811 821 823 827 829 839 853 857 859 863 877 881 883 887 907 911 919 929 937 941 947 953 967 971 977 983 991 997 
```

## Source code

The full source code alongside prebuilt Linux binaries can be found on the [GitHub repository](https://github.com/lucwl/cluck).

Included in the repository is a list of example programs designed to showcase the compiler features.

## Demonstration

{{< youtube sWV8i_IejM8 >}}
