const testData = {
    desktopApp: [
        {
            AppId: '10002',
            AppColor: '#00FF00',
            AppName: '此电脑',
            UrlPath: 'computer',
            // Component: 'setting/info.vue',
            IsImg: true,
            ImgUrl: require('@img/app/computer.png'),
            Iframe: false,
            IframeUrl: ''
        },
        {
            AppId: '10003',
            AppColor: '#FF0000',
            AppName: '文档',
            UrlPath: 'document',
            // Component: 'user/index3.vue',
            IsImg: true,
            ImgUrl: require('@img/app/document.png'),
            Iframe: false,
            IframeUrl: ''
        },
        {
            AppId: '10004',
            AppColor: '#FF0000',
            AppName: '地图',
            UrlPath: 'map',
            Component: 'iframe/index.vue',
            IsImg: true,
            ImgUrl: require('@img/app/map.png'),
            Iframe: true,
            IframeUrl: 'https://www.amap.com/'
        },
        {
            AppId: '10005',
            AppColor: '#FF0000',
            AppName: 'Google',
            UrlPath: 'google',
            Component: 'iframe/index.vue',
            IsImg: true,
            ImgUrl: require('@img/app/google.png'),
            Iframe: true,
            IframeUrl: 'https://www.google.cn/'
        },
        {
            AppId: '10006',
            AppColor: '#FF0000',
            AppName: 'Edge',
            UrlPath: 'edge',
            Component: 'iframe/index.vue',
            IsImg: true,
            ImgUrl: require('@img/app/Edge.png'),
            Iframe: true,
            IframeUrl: 'https://hao.360.com/?src=lm&ls=n08fd384698'
        },
        {
            AppId: '10007',
            AppColor: '#FF0000',
            AppName: '青训营',
            UrlPath: 'bytedance',
            Component: 'iframe/index.vue',
            IsImg: true,
            ImgUrl: require('@img/app/bytedance.png'),
            Iframe: true,
            IframeUrl: 'https://youthcamp.bytedance.com/'
        },
        {
            AppId: '10008',
            AppColor: '#FF0000',
            AppName: '淘宝',
            UrlPath: 'taobao',
            Component: 'iframe/index.vue',
            IsImg: true,
            ImgUrl: require('@img/app/taobao.png'),
            Iframe: true,
            IframeUrl: 'http://www.taobao.com'
        }
    ],
    allApp: [
        {
            AppId: '10004',
            AppColor: '#FF0000',
            AppName: '地图',
            UrlPath: 'map',
            Component: 'iframe/index.vue',
            IsImg: true,
            ImgUrl: require('@img/app/map.png'),
            Iframe: true,
            IframeUrl: 'https://www.amap.com/'
        },
        {
            AppId: '10005',
            AppColor: '#FF0000',
            AppName: 'Google',
            UrlPath: 'google',
            Component: 'iframe/index.vue',
            IsImg: true,
            ImgUrl: require('@img/app/google.png'),
            Iframe: true,
            IframeUrl: 'https://www.google.cn/'
        },
        {
            AppId: '10006',
            AppColor: '#FF0000',
            AppName: 'Edge',
            UrlPath: 'edge',
            Component: 'iframe/index.vue',
            IsImg: true,
            ImgUrl: require('@img/app/Edge.png'),
            Iframe: true,
            IframeUrl: 'https://hao.360.com/?src=lm&ls=n08fd384698'
        },
        {
            AppId: '10007',
            AppColor: '#FF0000',
            AppName: '青训营',
            UrlPath: 'bytedance',
            Component: 'iframe/index.vue',
            IsImg: true,
            ImgUrl: require('@img/app/bytedance.png'),
            Iframe: true,
            IframeUrl: 'https://youthcamp.bytedance.com/'
        },
        {
            AppId: '10008',
            AppColor: '#FF0000',
            AppName: '淘宝',
            UrlPath: 'taobao',
            Component: 'iframe/index.vue',
            IsImg: true,
            ImgUrl: require('@img/app/taobao.png'),
            Iframe: true,
            IframeUrl: 'http://www.taobao.com'
        },
        {
            AppId: '10009',
            AppColor: '#FF0000',
            AppName: 'VUE',
            UrlPath: 'vuelearn',
            Component: 'iframe/index.vue',
            IsImg: true,
            ImgUrl: require('@img/app/vue.png'),
            Iframe: true,
            IframeUrl: 'https://vuejs.bootcss.com/guide/'
        },
        {
            AppId: '10010',
            AppColor: '#FF0000',
            AppName: '日期',
            UrlPath: 'user3',
            // Component: 'user/index3.vue',
            IsImg: true,
            ImgUrl: require('@img/app/date.png'),
            Iframe: false,
            IframeUrl: ''
        }
    ],
    favoriteApp: [
        [{ span: 16, info: '待办事项', imgPath: require('@img/favorite/f1.png'), AppId: '10007' }],
        [{ span: 8, info: '消息通知', imgPath: require('@img/favorite/f2.png'), AppId: '10007' }, { span: 16, info: '即使消息', imgPath: require('@img/favorite/f3.png'), AppId: '10007' }],
        [{ span: 16, info: '统计查询', imgPath: require('@img/favorite/f1.png'), AppId: '10007' }, { span: 8, info: '待办文件', imgPath: require('@img/favorite/f2.png'), AppId: '10007' }],
        [{ span: 8, info: '月度报告', imgPath: require('@img/favorite/f2.png'), AppId: '10007' }, {span:8},{ span: 8, info: '待办事项', imgPath: require('@img/favorite/f2.png'), AppId: '10007' }],
        [{ span: 8, info: '延迟审批', imgPath: require('@img/favorite/f2.png'), AppId: '10007' }, { span: 16, info: '字节青训营', imgPath: require('@img/favorite/f3.png'), AppId: '10007' }]
    ]
}

export default testData