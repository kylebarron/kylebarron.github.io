---
layout: "post"
title: "Reading Stata files with Python"
date: "2018-01-08 11:59"
---

Stata is great for the small stuff, but Python is way better for anything intensive. However, you'll often have data in Stata's `.dta` format that you need to read. This post will detail the nice features available in Python's Stata import.

We'll use the 1978 Automobile Data that comes with Stata. First export this data into a file in your working directory:
```stata
sysuse auto
save "auto.dta", replace
```

Now open up Python. First import Pandas, the module in Python used to work with rectangular data frames.
```python
import pandas as pd
```

The most straightforward way to import a Stata file is a single line:
```python
auto = pd.read_stata('auto.dta')
```

This is really simple, and is fine for small files, but with larger files, you often need to finesse your data import.
Imagine you have a 100GB Stata file. For most computers, that's too big to import into memory.

First we need to create an _iterator_, which reads the metadata attached to the `.dta` file, but importantly doesn't read the data itself yet.
```python
itr = pd.read_stata('auto.dta', iterator = True)
```

Now it's possible to read in just a chunk of the data at a time.
```python
auto = itr.get_chunk(5)
```

You can also easily loop over the data like so:
```python
itr = pd.read_stata('auto.dta', iterator = True, chunksize = 10)
for df in itr:
    # Program operating on 10 rows of the dataset at a time

```

Now without importing the file, we can get the data label, number of observations, number of variables, and the timestamp at which the data were last saved.
```python
itr.data_label
itr.nobs
itr.nvar
itr.time_stamp
```

If we want to see the names and labels of the variables, we can use
```python
itr.varlist
itr.variable_labels()
```
Note that `itr.variable_labels()` returns a dictionary where the keys of the dictionary are the variable names and the values of the dictionary are the variable labels. So we can access the labels with something like:

```python
labels = itr.variable_labels()
# Gets the label of `mpg`
labels['mpg']
# Gets all keys
labels.keys()
# Gets all values
labels.values()
```

If you're working with a large dataset that might run up against memory constraints, you might want to keep in mind exactly how much memory the imported data will take up.

You can get a list of the number of bytes each column takes up with the `col_sizes` method:
```python
itr.col_sizes
```
So in `auto.dta`, the first column takes up 18 bytes for each row, while the rest of the columns take up between 1 and 4 bytes.

Lets get a better idea of what data types these columns are.
```python
itr.dtyplist
itr.fmtlist
```
The former shows you the data types that will be used in Python upon import and the latter shows the display formats the data had used in Stata (see [`help format`](https://www.stata.com/help.cgi?format)).

From `itr.dtyplist`, we can see that the first column is a string of length 18, while the rest are types `numpy.int8`, `numpy.int16`, and `numpy.float32`. These data types come from [Numpy](http://www.numpy.org/), a scientific library that Pandas is based upon, and correspond to Stata's `byte`, `int`, and `float`, respectively (see Stata's [`help data types`](https://www.stata.com/help.cgi?datatypes)).

The size of the data in memory is almost exactly the number of rows times the sum of the number of bytes needed for each row. I.e. if the number of rows is $N$, and the number of bytes each column uses is $B_{col}$, then the total memory use of the dataset is $N * \sum_{col} B_{col}$.

This can be helpful with understanding how many rows of a file to import at once. Let's say you want to not use more than 1GB of memory at once. If you want to import all columns of `auto.dta`, each row takes up `sum(itr.col_sizes)` $= 43$ bytes. So the number of rows you can import at a time is
\[
1024 MB * \frac{1024 KB}{1 MB} * \frac{1024 B}{1 KB} * \frac{1 \text{ row}}{43 B} \approx 25 \text{ million rows}
\]

Obviously with the `auto.dta` dataset we don't need to add restrictions on rows or columns, but in datasets with columns -- especially those with many string columns -- you might not be able to read in your whole dataset at once.



## Importing Data

Let's say we want to import all the data







