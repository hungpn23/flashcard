/* eslint-disable */
export default async () => {
    const t = {
        ["./dto/error/error-detail.dto"]: await import("./dto/error/error-detail.dto"),
        ["./constants/index"]: await import("./constants/index"),
        ["./dto/offset-pagination/metadata.dto"]: await import("./dto/offset-pagination/metadata.dto"),
        ["./modules/set/entities/set.entity"]: await import("./modules/set/entities/set.entity"),
        ["./modules/set/set.enum"]: await import("./modules/set/set.enum"),
        ["./modules/set/entities/card.entity"]: await import("./modules/set/entities/card.entity"),
        ["./modules/set/entities/progress.entity"]: await import("./modules/set/entities/progress.entity"),
        ["./modules/folder/folder.entity"]: await import("./modules/folder/folder.entity"),
        ["./modules/user/entities/user.entity"]: await import("./modules/user/entities/user.entity"),
        ["./modules/user/entities/session.entity"]: await import("./modules/user/entities/session.entity"),
        ["./modules/set/dtos/progress.dto"]: await import("./modules/set/dtos/progress.dto"),
        ["./modules/core/dtos/card.dto"]: await import("./modules/core/dtos/card.dto"),
        ["./modules/auth/auth.dto"]: await import("./modules/auth/auth.dto"),
        ["./modules/user/user.dto"]: await import("./modules/user/user.dto")
    };
    return { "@nestjs/swagger": { "models": [[import("./dto/error/error-detail.dto"), { "ErrorDetailDto": { property: { required: true, type: () => String }, code: { required: true, type: () => String }, message: { required: true, type: () => String } } }], [import("./dto/error/error.dto"), { "ErrorDto": { timestamp: { required: true, type: () => String }, statusCode: { required: true, type: () => Number }, message: { required: true, type: () => String }, details: { required: false, type: () => [t["./dto/error/error-detail.dto"].ErrorDetailDto] } }, "CommonErrorDto": {} }], [import("./dto/offset-pagination/query.dto"), { "OffsetPaginationQueryDto": { page: { required: false, type: () => Number, default: 1 }, take: { required: false, type: () => Number, default: 10 }, order: { required: false, enum: t["./constants/index"].Order }, search: { required: false, type: () => String } } }], [import("./dto/offset-pagination/metadata.dto"), { "OffsetMetadataDto": { take: { required: true, type: () => Number }, totalRecords: { required: true, type: () => Number }, totalPages: { required: true, type: () => Number }, currentPage: { required: true, type: () => Number }, nextPage: { required: false, type: () => Number }, previousPage: { required: false, type: () => Number } } }], [import("./dto/offset-pagination/paginated.dto"), { "OffsetPaginatedDto": { data: { required: true }, metadata: { required: true, type: () => t["./dto/offset-pagination/metadata.dto"].OffsetMetadataDto } } }], [import("./modules/auth/auth.dto"), { "AuthReqDto": { email: { required: true, type: () => String }, password: { required: true, type: () => String } }, "AuthResDto": { accessToken: { required: true, type: () => String }, refreshToken: { required: true, type: () => String } }, "LoginResDto": {}, "RefreshResDto": {} }], [import("./database/entities/abstract.entity"), { "AbstractEntity": { createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, createdBy: { required: true, type: () => Number }, updatedBy: { required: true, type: () => Number } }, "DeletableAbstractEntity": {} }], [import("./modules/folder/folder.entity"), { "FolderEntity": { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, description: { required: false, type: () => String }, sets: { required: true, type: () => [t["./modules/set/entities/set.entity"].SetEntity] } } }], [import("./modules/set/entities/set.entity"), { "SetEntity": { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, slug: { required: true, type: () => String }, description: { required: false, type: () => String }, visibleTo: { required: true, enum: t["./modules/set/set.enum"].VisibleTo }, visibleToPassword: { required: false, type: () => String }, editableBy: { required: true, enum: t["./modules/set/set.enum"].EditableBy }, editableByPassword: { required: false, type: () => String }, cards: { required: true, type: () => [t["./modules/set/entities/card.entity"].CardEntity] }, progresses: { required: true, type: () => [t["./modules/set/entities/progress.entity"].ProgressEntity] }, folder: { required: true, type: () => t["./modules/folder/folder.entity"].FolderEntity } } }], [import("./modules/set/entities/card.entity"), { "CardEntity": { id: { required: true, type: () => Number }, term: { required: true, type: () => String }, definition: { required: true, type: () => String }, progresses: { required: true, type: () => [t["./modules/set/entities/progress.entity"].ProgressEntity] }, set: { required: true, type: () => t["./modules/set/entities/set.entity"].SetEntity } } }], [import("./modules/set/entities/progress.entity"), { "ProgressEntity": { id: { required: true, type: () => Number }, correctCount: { required: false, type: () => Number }, user: { required: true, type: () => t["./modules/user/entities/user.entity"].UserEntity }, set: { required: true, type: () => t["./modules/set/entities/set.entity"].SetEntity }, card: { required: true, type: () => t["./modules/set/entities/card.entity"].CardEntity } } }], [import("./modules/user/entities/user.entity"), { "UserEntity": { id: { required: true, type: () => Number }, role: { required: true, enum: t["./constants/index"].Role }, username: { required: false, type: () => String }, email: { required: true, type: () => String }, isEmailVerified: { required: true, type: () => Boolean }, bio: { required: false, type: () => String }, avatar: { required: false, type: () => String }, sessions: { required: true, type: () => [t["./modules/user/entities/session.entity"].SessionEntity] }, progresses: { required: true, type: () => [t["./modules/set/entities/progress.entity"].ProgressEntity] } } }], [import("./modules/user/entities/session.entity"), { "SessionEntity": { id: { required: true, type: () => Number }, expiresAt: { required: true, type: () => Date }, user: { required: true, type: () => t["./modules/user/entities/user.entity"].UserEntity } } }], [import("./modules/core/dtos/card.dto"), { "CardDto": { term: { required: true, type: () => String }, definition: { required: true, type: () => String } } }], [import("./modules/core/dtos/core.dto"), { "ConvertFromTextDto": { input: { required: true, type: () => String } } }], [import("./modules/folder/folder.dto"), { "CreateFolderDto": { name: { required: true, type: () => String }, description: { required: false, type: () => String } }, "UpdateFolderDto": {}, "AddSetsDto": { setIds: { required: true, type: () => [Number] } }, "RemoveSetsDto": {} }], [import("./modules/set/dtos/progress.dto"), { "ProgressMetadataDto": { totalCards: { required: true, type: () => Number }, notStudiedCount: { required: true, type: () => Number }, learningCount: { required: true, type: () => Number }, knowCount: { required: true, type: () => Number } }, "GetProgressResDto": { set: { required: true, type: () => t["./modules/set/entities/set.entity"].SetEntity }, metadata: { required: true, type: () => t["./modules/set/dtos/progress.dto"].ProgressMetadataDto } }, "GetProgressDto": { visibleToPassword: { required: false, type: () => String } }, "SaveAnswerDto": { isCorrect: { required: true, type: () => Boolean } } }], [import("./modules/set/dtos/set.dto"), { "CreateSetDto": { name: { required: true, type: () => String }, description: { required: false, type: () => String }, visibleTo: { required: true, enum: t["./modules/set/set.enum"].VisibleTo }, visibleToPassword: { required: true, type: () => String }, editableBy: { required: true, enum: t["./modules/set/set.enum"].EditableBy }, editableByPassword: { required: true, type: () => String }, cards: { required: true, type: () => [t["./modules/core/dtos/card.dto"].CardDto] } }, "FindOneSetDto": { visibleToPassword: { required: false, type: () => String } }, "UpdateSetDto": {} }], [import("./modules/user/user.dto"), { "UpdateUserDto": { username: { required: false, type: () => String }, email: { required: false, type: () => String }, bio: { required: false, type: () => String } }, "UploadAvatarResponseDto": { avatarUrl: { required: true, type: () => String } } }]], "controllers": [[import("./modules/auth/auth.controller"), { "AuthController": { "register": {}, "login": { type: t["./modules/auth/auth.dto"].LoginResDto }, "logout": {}, "refreshToken": { type: t["./modules/auth/auth.dto"].RefreshResDto }, "forgotPassword": { type: String }, "verifyForgotPassword": { type: String }, "verifyEmail": { type: String }, "resendVerifyEmail": { type: String } } }], [import("./modules/core/core.controller"), { "CoreController": { "convertFromText": { type: [t["./modules/core/dtos/card.dto"].CardDto] }, "convertFromXlsx": { type: [t["./modules/core/dtos/card.dto"].CardDto] } } }], [import("./modules/folder/folder.controller"), { "FolderController": { "create": { type: t["./modules/folder/folder.entity"].FolderEntity }, "findAll": {}, "findOne": { type: t["./modules/folder/folder.entity"].FolderEntity }, "update": { type: t["./modules/folder/folder.entity"].FolderEntity }, "remove": { type: t["./modules/folder/folder.entity"].FolderEntity }, "addSets": { type: t["./modules/folder/folder.entity"].FolderEntity }, "removeSets": { type: t["./modules/folder/folder.entity"].FolderEntity } } }], [import("./modules/set/set.controller"), { "SetController": { "create": { type: t["./modules/set/entities/set.entity"].SetEntity }, "findAll": {}, "findMySets": {}, "update": { type: t["./modules/set/entities/set.entity"].SetEntity }, "remove": { type: t["./modules/set/entities/set.entity"].SetEntity }, "findProgressBySetId": { type: t["./modules/set/dtos/progress.dto"].GetProgressResDto }, "saveAnswer": { type: t["./modules/set/dtos/progress.dto"].ProgressMetadataDto } } }], [import("./modules/user/user.controller"), { "UserController": { "getOne": { type: t["./modules/user/entities/user.entity"].UserEntity }, "getAll": { type: [t["./modules/user/entities/user.entity"].UserEntity] }, "updateProfile": { type: t["./modules/user/entities/user.entity"].UserEntity }, "uploadAvatar": { type: t["./modules/user/user.dto"].UploadAvatarResponseDto }, "deleteAvatar": {} } }]] } };
};