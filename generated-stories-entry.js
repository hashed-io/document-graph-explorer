'use strict'

var _frameworkImportPath = require('@storybook/vue');

/* eslint-disable import/no-unresolved */
(0, _frameworkImportPath.configure)([require.context('./src', true, /^\.(?:(?:^|\/|(?:(?:(?!(?:^|\/)\.).)*?)\/)(?!\.)(?=.)[^/]*?\.stories\.mdx)$/), require.context('./src', true, /^\.(?:(?:^|\/|(?:(?:(?!(?:^|\/)\.).)*?)\/)(?!\.)(?=.)[^/]*?\.stories\.(js|jsx|ts|tsx))$/)], module, false)
