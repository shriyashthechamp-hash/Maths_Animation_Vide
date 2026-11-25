# MATHEMATICAL VERIFICATION & VIVA PREPARATION
## Academic Reference: Mathematics-3 (Linear Algebra), Newton School of Technology
### Lecture Sheet 10: "Matrices in Motion" — Comprehensive Mathematical Proofs & Derivations

This document serves as the absolute mathematical source of truth for **The Matrix Effect**. Every equation appearing in the film is derived from first principles, step-by-step calculations are verified, geometric interpretations are detailed, and expected viva defense questions are prepared.

---

## 1. THE FOUNDATION: MATRIX AS A LINEAR OPERATOR

### 1.1 Vector Space and Standard Basis
In Euclidean 2D space $\mathbb{R}^2$, any vector $\mathbf{v} = \begin{bmatrix} x \\ y \end{bmatrix}$ can be expressed uniquely as a linear combination of the standard orthonormal basis vectors:
$$\mathbf{e}_1 = \begin{bmatrix} 1 \\ 0 \end{bmatrix}, \quad \mathbf{e}_2 = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$$
$$\mathbf{v} = x \mathbf{e}_1 + y \mathbf{e}_2 = x \begin{bmatrix} 1 \\ 0 \end{bmatrix} + y \begin{bmatrix} 0 \\ 1 \end{bmatrix} = \begin{bmatrix} x \\ y \end{bmatrix}$$

### 1.2 The Linearity Implication
If $T: \mathbb{R}^2 \to \mathbb{R}^2$ is a linear transformation, then by definition:
$$T(\mathbf{v}) = T(x \mathbf{e}_1 + y \mathbf{e}_2) = x T(\mathbf{e}_1) + y T(\mathbf{e}_2)$$
This is the central theorem of 2D linear transformations:
> **Theorem:** A linear transformation $T$ is completely and uniquely determined by its action on the basis vectors $\{\mathbf{e}_1, \mathbf{e}_2\}$.

### 1.3 Column Construction of a Matrix
If $T(\mathbf{e}_1) = \begin{bmatrix} a \\ c \end{bmatrix}$ and $T(\mathbf{e}_2) = \begin{bmatrix} b \\ d \end{bmatrix}$, then:
$$T(\mathbf{v}) = x \begin{bmatrix} a \\ c \end{bmatrix} + y \begin{bmatrix} b \\ d \end{bmatrix} = \begin{bmatrix} ax + by \\ cx + dy \end{bmatrix} = \begin{bmatrix} a & b \\ c & d \end{bmatrix} \begin{bmatrix} x \\ y \end{bmatrix}$$
Therefore, the matrix representation $\mathbf{M}$ with respect to the standard basis is formed by placing the transformed basis vectors directly into its columns:
$$\mathbf{M} = \begin{bmatrix} T(\mathbf{e}_1) & T(\mathbf{e}_2) \end{bmatrix} = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$$

- **Appears in Film:** Scene 02 (00:44 – 01:10) & Scene 05 (02:55 – 03:48).

---

## 2. THE SHEAR TRANSFORMATION: MATRIX S

### 2.1 Definition from Lecture Sheet 10
The shear matrix $\mathbf{S}$ is defined as:
$$\mathbf{S} = \begin{bmatrix} 1 & 0 \\ 1 & 1 \end{bmatrix}$$

### 2.2 Basis Vector Evaluation
- **Transforming $\mathbf{e}_1$:**
  $$\mathbf{S} \mathbf{e}_1 = \begin{bmatrix} 1 & 0 \\ 1 & 1 \end{bmatrix} \begin{bmatrix} 1 \\ 0 \end{bmatrix} = \begin{bmatrix} 1(1) + 0(0) \\ 1(1) + 1(0) \end{bmatrix} = \begin{bmatrix} 1 \\ 1 \end{bmatrix}$$
  *Interpretation:* The horizontal unit vector $\mathbf{e}_1$, initially pointing along the x-axis to $(1, 0)$, tilts upwards to $(1, 1)$.

- **Transforming $\mathbf{e}_2$:**
  $$\mathbf{S} \mathbf{e}_2 = \begin{bmatrix} 1 & 0 \\ 1 & 1 \end{bmatrix} \begin{bmatrix} 0 \\ 1 \end{bmatrix} = \begin{bmatrix} 1(0) + 0(1) \\ 1(0) + 1(1) \end{bmatrix} = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$$
  *Interpretation:* The vertical unit vector $\mathbf{e}_2$ remains completely stationary at $(0, 1)$.

### 2.3 General Vector Mapping
For an arbitrary input point $(x, y) \in \mathbb{R}^2$:
$$\mathbf{S} \begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} 1 \cdot x + 0 \cdot y \\ 1 \cdot x + 1 \cdot y \end{bmatrix} = \begin{bmatrix} x \\ x + y \end{bmatrix}$$
This confirms the transformation rule:
$$S(x, y) = (x, x + y)$$

### 2.4 Why Does $\mathbf{e}_2$ Remain Fixed?
In the formula $(x, x + y)$, the vertical displacement is $\Delta y = (x + y) - y = x$.  
Because every point on the vertical y-axis has coordinate $x = 0$, its vertical displacement is:
$$\Delta y = 0$$
Hence, every point on the y-axis (including $\mathbf{e}_2$) is an invariant point under this vertical shear.

### 2.5 Transformation of the Unit Square
Consider the unit square $\mathcal{U}$ with vertices:
- $O = (0, 0)$
- $A = (1, 0) = \mathbf{e}_1$
- $B = (1, 1) = \mathbf{e}_1 + \mathbf{e}_2$
- $C = (0, 1) = \mathbf{e}_2$

Under transformation $\mathbf{S}$:
- $S(O) = (0, 0 + 0) = (0, 0)$
- $S(A) = (1, 1 + 0) = (1, 1)$
- $S(B) = (1, 1 + 1) = (1, 2)$
- $S(C) = (0, 0 + 1) = (0, 1)$

The unit square transforms into a parallelogram with vertices $(0, 0), (1, 1), (1, 2), (0, 1)$.
- **Area Conservation:**
  $$\det(\mathbf{S}) = \det \begin{bmatrix} 1 & 0 \\ 1 & 1 \end{bmatrix} = (1)(1) - (0)(1) = 1$$
  Since $|\det(\mathbf{S})| = 1$, the area of the transformed figure is identical to the area of the original unit square ($\text{Area} = 1$). However, side lengths and interior angles are *not* preserved.

- **Appears in Film:** Scene 03 (01:10 – 02:05).

---

## 3. DEFINING CONDITIONS OF A LINEAR TRANSFORMATION

A transformation $T: \mathbb{R}^n \to \mathbb{R}^m$ is linear if and only if it satisfies two axioms for all vectors $\mathbf{u}, \mathbf{v}$ and scalars $c$:
1. **Additivity:** $T(\mathbf{u} + \mathbf{v}) = T(\mathbf{u}) + T(\mathbf{v})$
2. **Homogeneity (Scalar Multiplication):** $T(c\mathbf{u}) = c T(\mathbf{u})$

### 3.1 Immediate Geometric Consequences
- **Preservation of the Origin:**
  $$T(\mathbf{0}) = T(0 \cdot \mathbf{u}) = 0 \cdot T(\mathbf{u}) = \mathbf{0}$$
  A linear transformation can never translate space away from the origin.
- **Preservation of Lines and Parallelism:**
  A line $\mathbf{r}(t) = \mathbf{p} + t \mathbf{d}$ transforms to:
  $$T(\mathbf{r}(t)) = T(\mathbf{p}) + t T(\mathbf{d})$$
  which is either a line (if $T(\mathbf{d}) \neq \mathbf{0}$) or a single point. Grid lines remain straight and parallel.

---

## 4. WORKED PROOF: TRANSFORMATION T(x, y) = (x + y, x - y)

From Lecture Sheet 10, consider:
$$T: \mathbb{R}^2 \to \mathbb{R}^2, \quad T(x, y) = (x + y, x - y)$$

### 4.1 Proof of Property 1: Additivity
Let $\mathbf{u} = (x_1, y_1)$ and $\mathbf{v} = (x_2, y_2)$ be arbitrary vectors in $\mathbb{R}^2$.
Then their sum is:
$$\mathbf{u} + \mathbf{v} = (x_1 + x_2, y_1 + y_2)$$

Applying the definition of $T$:
$$T(\mathbf{u} + \mathbf{v}) = \Big( (x_1 + x_2) + (y_1 + y_2), \; (x_1 + x_2) - (y_1 + y_2) \Big)$$

Using the associative and commutative properties of real numbers, rearrange terms:
$$T(\mathbf{u} + \mathbf{v}) = \Big( (x_1 + y_1) + (x_2 + y_2), \; (x_1 - y_1) + (x_2 - y_2) \Big)$$

By definition of vector addition:
$$T(\mathbf{u} + \mathbf{v}) = (x_1 + y_1, x_1 - y_1) + (x_2 + y_2, x_2 - y_2)$$

Recognizing the individual transformations:
$$T(\mathbf{u} + \mathbf{v}) = T(\mathbf{u}) + T(\mathbf{v}) \quad \blacksquare$$

### 4.2 Proof of Property 2: Homogeneity (Scalar Multiplication)
Let $\mathbf{u} = (x, y) \in \mathbb{R}^2$ and $c \in \mathbb{R}$ be an arbitrary scalar.
The scaled vector is:
$$c\mathbf{u} = (cx, cy)$$

Applying the definition of $T$:
$$T(c\mathbf{u}) = (cx + cy, \; cx - cy)$$

Factor out scalar $c$ from each component:
$$T(c\mathbf{u}) = \Big( c(x + y), \; c(x - y) \Big)$$

By scalar multiplication of vectors:
$$T(c\mathbf{u}) = c (x + y, x - y)$$

Recognizing $T(\mathbf{u})$:
$$T(c\mathbf{u}) = c T(\mathbf{u}) \quad \blacksquare$$

Since both Additivity and Homogeneity hold universally, $T$ is proven to be a linear transformation.

- **Appears in Film:** Scene 04 (02:05 – 02:55).

---

## 5. MATRIX CONSTRUCTION FOR T

Using the theorem from Section 1.3, construct the standard matrix $\mathbf{M}$ representing $T(x, y) = (x + y, x - y)$.

### 5.1 Step 1: Evaluate $T(\mathbf{e}_1)$
$$\mathbf{e}_1 = \begin{bmatrix} 1 \\ 0 \end{bmatrix} \implies x = 1, y = 0$$
$$T(\mathbf{e}_1) = \begin{bmatrix} 1 + 0 \\ 1 - 0 \end{bmatrix} = \begin{bmatrix} 1 \\ 1 \end{bmatrix}$$
This vector forms the **first column** of matrix $\mathbf{M}$.

### 5.2 Step 2: Evaluate $T(\mathbf{e}_2)$
$$\mathbf{e}_2 = \begin{bmatrix} 0 \\ 1 \end{bmatrix} \implies x = 0, y = 1$$
$$T(\mathbf{e}_2) = \begin{bmatrix} 0 + 1 \\ 0 - 1 \end{bmatrix} = \begin{bmatrix} 1 \\ -1 \end{bmatrix}$$
This vector forms the **second column** of matrix $\mathbf{M}$.

### 5.3 Step 3: Assemble Matrix $\mathbf{M}$
$$\mathbf{M} = \begin{bmatrix} T(\mathbf{e}_1) & T(\mathbf{e}_2) \end{bmatrix} = \begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}$$

- **Appears in Film:** Scene 05 (02:55 – 03:48).

---

## 6. INDEPENDENT DUAL VERIFICATION: VECTOR v = (3, 2)

As specified in Lecture Sheet 10, verify the operation on input vector $\mathbf{v} = \begin{bmatrix} 3 \\ 2 \end{bmatrix}$.

### 6.1 Method A: Direct Evaluation via Transformation Rule
Given $T(x, y) = (x + y, x - y)$:
Substitute $x = 3, y = 2$:
$$T(3, 2) = (3 + 2, \; 3 - 2) = (5, 1)$$

$$\therefore T(\mathbf{v}) = \begin{bmatrix} 5 \\ 1 \end{bmatrix}$$

### 6.2 Method B: Matrix-Vector Multiplication
Multiply matrix $\mathbf{M}$ by vector $\mathbf{v}$:
$$\mathbf{M} \mathbf{v} = \begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix} \begin{bmatrix} 3 \\ 2 \end{bmatrix}$$

Using standard row-by-column matrix multiplication:
$$\mathbf{M} \mathbf{v} = \begin{bmatrix} (1 \cdot 3) + (1 \cdot 2) \\ (1 \cdot 3) + (-1 \cdot 2) \end{bmatrix} = \begin{bmatrix} 3 + 2 \\ 3 - 2 \end{bmatrix} = \begin{bmatrix} 5 \\ 1 \end{bmatrix}$$

### 6.3 Conclusion of Verification
$$\text{Method A} = \begin{bmatrix} 5 \\ 1 \end{bmatrix} \equiv \text{Method B} = \begin{bmatrix} 5 \\ 1 \end{bmatrix}$$
Both methods produce the identical output vector $(5, 1)$.

### 6.4 Academic Significance
This agreement formally proves that:
1. Matrix multiplication is not an arbitrary set of arithmetic steps; it is the exact algebraic encoding of a linear transformation.
2. The columns of the matrix dictate how linear combinations of basis vectors scale and recombine to map any input vector to its correct transformed coordinate.

- **Appears in Film:** Scene 05 (03:48 – 04:15).

---

## 7. INDIVIDUAL VIVA DEFENSE PREPARATION GUIDE

### Question 1: "Why do the columns of a matrix represent where the basis vectors land?"
**Examiner's intent:** Checking if you understand the connection between matrix columns and vector transformations or just memorized the rule.  
**Model Student Answer:**  
"Because any vector $\mathbf{v} = \begin{bmatrix} x \\ y \end{bmatrix}$ is algebraically $x\mathbf{e}_1 + y\mathbf{e}_2$. Due to linearity, $T(\mathbf{v}) = x T(\mathbf{e}_1) + y T(\mathbf{e}_2)$. When we multiply a matrix $\begin{bmatrix} \mathbf{c}_1 & \mathbf{c}_2 \end{bmatrix}$ by $\begin{bmatrix} x \\ y \end{bmatrix}$, the definition of matrix multiplication gives $x \mathbf{c}_1 + y \mathbf{c}_2$. By direct comparison, the first column $\mathbf{c}_1$ must be $T(\mathbf{e}_1)$ and the second column $\mathbf{c}_2$ must be $T(\mathbf{e}_2)$."

### Question 2: "Does every linear transformation preserve lengths, angles, or areas?"
**Examiner's intent:** Testing for oversimplification.  
**Model Student Answer:**  
"No, sir. That is a common misconception. Only orthogonal transformations (rotations and reflections) preserve lengths and angles (isometries). Shear transformations (like our matrix $\mathbf{S}$) distort both lengths and angles while preserving area (since $\det(\mathbf{S}) = 1$). Other transformations, like scaling or general projections, alter length, angle, and area. What *all* linear transformations preserve is the algebraic structure: lines remain lines (or map to the origin), parallel lines remain parallel, and the origin remains fixed."

### Question 3: "In the shear matrix $\mathbf{S} = \begin{bmatrix} 1 & 0 \\ 1 & 1 \end{bmatrix}$, why didn't $\mathbf{e}_2$ move?"
**Examiner's intent:** Checking geometric intuition of shear.  
**Model Student Answer:**  
"In the shear $S(x, y) = (x, x + y)$, the vertical displacement is governed strictly by the horizontal coordinate $x$. For $\mathbf{e}_2 = (0, 1)$, its $x$-coordinate is zero. Therefore, its vertical shift is $0$, meaning $S(0, 1) = (0, 0+1) = (0, 1)$. Every point along the y-axis remains an invariant fixed point."

### Question 4: "Is $T(\mathbf{0}) = \mathbf{0}$ enough to prove that a transformation is linear?"
**Examiner's intent:** Testing logical necessity vs. sufficiency.  
**Model Student Answer:**  
"No, $T(\mathbf{0}) = \mathbf{0}$ is a *necessary* condition, but not a *sufficient* condition. For instance, $T(x, y) = (x^2, y^2)$ maps $(0, 0)$ to $(0, 0)$, but it violates both additivity and homogeneity ($T(2\mathbf{u}) = 4T(\mathbf{u}) \neq 2T(\mathbf{u})$), so it is nonlinear."

### Question 5: "What is the determinant of matrix $\mathbf{M} = \begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}$ and what does its sign mean geometrically?"
**Examiner's intent:** Testing deeper geometric comprehension of matrix $\mathbf{M}$.  
**Model Student Answer:**  
"The determinant is $\det(\mathbf{M}) = (1)(-1) - (1)(1) = -1 - 1 = -2$. The magnitude $|-2| = 2$ means that the transformation doubles the area of any geometric shape in the plane. The negative sign indicates that the orientation of space is inverted or flipped, similar to a reflection."
