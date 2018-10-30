# Learning PIXI

## Accessibility
为残疾人提供辅助功能，创建dom组件，监控tab键以及其他辅助键操作，方便那些使用screen reader的用户。暂时略过
## Core
 * display相关
  * bounds
  * container
  * DisplayObject
    abstract class, extends eventemitter3
    updateTransform控制transform的更新 包括position, scale, skew, 重写这个方法可以控制物体的变换
## Extract
## Extras
## Filters

### SpriteMask

fragment着色器
1. 查看点是否点在物体身上（满足4个step）存在clip = 1， 不存在clip = 0
2. 每个点的颜色乘上透明度乘上clip(如果该点clip为0，则此点颜色为0)

## Interaction
## Loaders
## Mesh
## Paricles
## Polyfill
## Prepare

## Shader
OpenGl Shader Language
Graphics Processor Unit
Blind and memoryless contraints


step(x, y)   
x小于y return 0 否则return 1
smoothstep(a, b, x)
如果x小于a return 0 否则return 1，如果x在ab范围内，则按照一定规则进行插值（？）


