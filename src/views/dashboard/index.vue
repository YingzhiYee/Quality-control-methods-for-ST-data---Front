<template>
  <div class="components-container">
    <aside style="font-size: 18px;">
      Spatial transcriptome data needs to be processed before data analysis.There are more questions. For example, data obtained by sequencing exists data Pollution, data noise, sparse data (many 0) and so on.To that end, we plan to develop a website that integrates quality control algorithms.Allows users to control the quality of spatial transcriptome data.
      <a style="font-size: 20px;" target="_blank" class="link-type" href="https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html">Know more</a>
    </aside>
    <div>
      <tinymce v-model="content" :height="300" />
    </div>
    <div class="editor-content"  >
      <h1 style="text-align: left;font-size: 40px;" >Welcome to the StMethods!</h1>
       <div style="text-align:center;"><img src="@/assets/shouye.png" width="773" height="230" alt="首页标题" ></div>
            <p style="margin-top: 20px; font-size: 25px; font-family: 'Times New Roman', sans-serif, Arial, Helvetica; color:#323135a1; margin-bottom: 30px;">
              We will help researchers quality control the spatial transcriptome data, remove low-quality data, and make subsequent data analysis have better clustering effect, making full use of the spatial location information of cells. 
              This is of great significance for understanding the occurrence and development mechanism of cancer and promoting the development of precision medicine.
              <a href="./#/predict" style="vertical-align: baseline;">
                      </a> You can download our tool from <a href="https://github.com/YingzhiYee/Quality-control-methods-for-ST-data---Front" target="_blank"  class="link-type" style="vertical-align: baseline;"><b>GitHub</b></a>.<br /><br />
                      If you have questions about our project, please feel free to leave a comment on  <a href="https://github.com/YingzhiYee/Quality-control-methods-for-ST-data---Front" style="vertical-align: baseline;" class="link-type"><b>GitHub</b></a> or contact us directly by 
                      <a href="20301029@bjtu.edu.cn" target="_blank" class="link-type" style="vertical-align: baseline;"><b>email</b></a>.<br /><br />
                      </p >
         <div style="background: #F6F8FB; border:2px solid #EBF0F8; border-radius: 10px; magin-top: 10px;">
            <p style="margin-left: 10px; font-size: 20px; font-family: 'Times New Roman', sans-serif, Arial, Helvetica; color:#000000; margin-bottom: 10px;">
             Updates:<br /></p>
            <p style="margin-left: 20px; line-height: 25px; font-size: 22px; font-family: 'Times New Roman', sans-serif, Arial, Helvetica; color:#000000; margin-bottom: 15px;">
            <b>2024-04-15:The latest version has been added to the quality control algorithm.</b><br />
            2023-10-20: Project pilot version.
            </p>
          </div>

          <div>
          <p style="margin-top: 35px; font-size: 20px; font-family: consolas, 'Times New Roman', sans-serif, Arial, Helvetica; color:#000000; margin-bottom: 5px;">
          If you find StMethods useful, Please consider purchasing the official version to support our project!</p>
          
       
          
          </div>
      </div>
           
                <el-col :span="24"><div class="grid-content">
                    <div  style="text-align: center;">
                        <p style="font-size: 20px; margin-top: 20px; margin-bottom: 10px;">Developed by <a href="http://bis.zju.edu.cn/binfo/index.htm"  target="_blank" style="vertical-align: baseline;">YeYingzhi、WangXinyi、LiYunbing</a>, BeiJing JiaoTong University.</p></div></div></el-col>
      </div>
  
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  // name: 'TinymceDemo',
  // components: { Tinymce },
  data() {
    return {
      content:
      ``
    }
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>
