#TO FIND THE AREA & VOLUME OF DIFFERENT SHAPES
import math
def circle(r):
    '''Parameters required are (r=radius) of circle
    Return the area of circle'''
    return math.pi*r*r
def square(s):
    '''Parameters required are (s=side) of square
    Return the area of square'''
    return s**2
def rectangle(l,b):
    '''Parameters required are (l=length,b=breadth) of rectangle
    Return the area of rectangle'''
    return l*b
def triangle(b,h):
    '''Parameters required are (b=base,h=height) of triangle
    Return the area of triangle'''
    return 1/2*b*h
def cube(s):
    '''Parameters required are (s=side) of cube
    Return the volume of cube'''
    return s**3
def cuboid(l,b,h):
    '''Return the volume of cuboid
    Parameters required are (l=length,b=breadth,h=height) of cuboid'''
    return l*b*h
def cone(r,h):
    '''Parameters required are (r=radius,h=height) of cone
    Return the volume of cone'''
    return 1/3*math.pi*r*r*h
def sphere(r):
    '''Parameters required are (r=radius) of sphere
    Return the volume of sphere'''
    return 4/3*math.pi*r*r*r
def cylinder(r,h):
    '''Parameters required are (r=radius,h=height) of cylinder
    Return the volume of cylinder'''
    return math.pi*r*r*h

